package com.example.snsClone.service;

import com.example.snsClone.dto.CommentDTO;
import com.example.snsClone.dto.PostDetailDTO;
import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.entity.PostEntity;
import com.example.snsClone.entity.PostLikeEntity;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.repository.*;
import com.example.snsClone.security.jwt.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostLikeRepository postLikeRepository;
    private final CommentRepository commentRepository;
    private final FollowRepository followRepository;
    private final JwtUtil jwtUtil;

    public PostService(PostRepository postRepository, UserRepository userRepository,
                       PostLikeRepository postLikeRepository, CommentRepository commentRepository,
                       FollowRepository followRepository, JwtUtil jwtUtil) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postLikeRepository = postLikeRepository;
        this.commentRepository = commentRepository;
        this.followRepository = followRepository;
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<ResponseDTO> getAllPost(String nickName, String authorizationHeader) {

        String token = authorizationHeader.substring(7);
        String userEmail = jwtUtil.extractEmail(token);

        UserEntity loginUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("로그인한 사용자를 찾을 수 없습니다."));

        UserEntity profileUser = userRepository.findByNickName(nickName)
                .orElseThrow(() -> new RuntimeException("해당 유저가 존재하지 않습니다."));

        List<PostEntity> postList = postRepository.findByUser(profileUser);

        // 게시글 데이터를 map으로 변환
        List<Map<String, Object>> posts = postList.stream()
                .map(post -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("postID", String.valueOf(post.getId()));
                    map.put("imageURL", post.getImage());

                    int likeCount = postLikeRepository.countByPost(post);
                    int commentCount = commentRepository.countByPost(post);

                    map.put("likes", likeCount);
                    map.put("comments", commentCount);

                    return map;
                })
                .toList();

        return ResponseEntity.ok(new ResponseDTO(200, true, "게시글 목록 조회 성공", posts));
    }

    public  ResponseEntity<ResponseDTO> getDetailPosts(Long postID, String authorizationHeader) {

        String token = authorizationHeader.substring(7);
        String userEmail = jwtUtil.extractEmail(token);

        UserEntity loginUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("로그인한 사용자를 찾을 수 없습니다."));

        PostEntity post = postRepository.findById(postID)
                .orElseThrow(() -> new RuntimeException("해당 게시글을 찾을 수 없습니다."));

        boolean isLiked = postLikeRepository.existsByUserAndPost(loginUser, post);

        List<CommentDTO> commentDTOList = post.getComments().stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getUser().getNickName(),
                        comment.getContext()
                ))
                .collect(Collectors.toList());

        int likeCount = postLikeRepository.countByPost(post);

        PostDetailDTO postDetail = new PostDetailDTO(
                post.getId(),
                post.getImage(),
                likeCount,
                isLiked,
                post.getCreatedAt(),
                post.getContext(),
                commentDTOList
        );

        return ResponseEntity.ok(new ResponseDTO(200, true, "게시글 상세 정보", postDetail));
    }

    public ResponseEntity<ResponseDTO> toggleLike(String authHeader, Long postId) {
        String token = authHeader.substring(7);
        String userEmail = jwtUtil.extractEmail(token);

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        Optional<PostLikeEntity> existingLike = postLikeRepository.findByUserAndPost(user, post);

        if (existingLike.isPresent()) {
            // 이미 좋아요 누른 상태 → 삭제
            postLikeRepository.delete(existingLike.get());
            return ResponseEntity.ok(new ResponseDTO(200, true, "좋아요 취소"));
        } else {
            // 좋아요 등록
            PostLikeEntity like = new PostLikeEntity();
            like.setUser(user);
            like.setPost(post);
            postLikeRepository.save(like);
            return ResponseEntity.ok(new ResponseDTO(200, true, "따봉~"));
        }
    }

    public ResponseDTO getUserLikes(String authorizationHeader, Long postId) {
        // 1. 로그인한 사용자 정보 추출
        String token = authorizationHeader.substring(7);
        String userEmail = jwtUtil.extractEmail(token);

        UserEntity loginUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        // 2. 게시글 조회
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("해당 게시글이 존재하지 않습니다."));

        // 3. 해당 게시글에 눌린 좋아요 전체 조회
        List<PostLikeEntity> likeList = postLikeRepository.findAllByPost(post);

        // 4. 좋아요 누른 사용자 정보와 로그인 유저가 팔로우 중인지 확인
        List<Map<String, Object>> responseData = new ArrayList<>();

        for (int i = 0; i < likeList.size(); i++) {
            PostLikeEntity like = likeList.get(i);
            UserEntity likedUser = like.getUser();

            // 로그인 유저가 이 사용자를 팔로우하고 있는지 여부
            boolean isFollow = followRepository.existsByFollowerAndFollowing(loginUser, likedUser);

            Map<String, Object> userMap = new HashMap<>();
            userMap.put("userID", likedUser.getNickName());
            userMap.put("isFollow", isFollow);

            responseData.add(userMap);
        }

        // 5. 응답 반환
        return new ResponseDTO(200, true, "좋아요 누른 유저 목록 조회 성공", responseData);
    }

}
