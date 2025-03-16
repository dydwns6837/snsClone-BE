package com.example.snsClone.service;

import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.dto.SignupRequestDTO;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.repository.FollowRepository;
import com.example.snsClone.repository.PostRepository;
import com.example.snsClone.repository.UserRepository;
import com.example.snsClone.security.jwt.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PostRepository postRepository;
    private final FollowRepository followRepository;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, FollowRepository followRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.followRepository = followRepository;
        this.postRepository = postRepository;
    }


    public UserEntity getUserInfo() {
        return userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. DB에 데이터를 추가하세요."));
    }

    public UserEntity updateUser(SignupRequestDTO request) {
        UserEntity user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        user.setName(request.getName());
        return userRepository.save(user);
    }

    public void deleteUser() {
        UserEntity user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        userRepository.delete(user);
    }

    public ResponseDTO getNicknameByToken(String token) {

        try {
            // 1. "Bearer " 제거 후 JWT 파싱
            String jwt = token.substring(7);

            // 2. JWT에서 이메일 추출 후 이메일이 있는지 확인.
            String email = jwtUtil.extractEmail(jwt);

            if (email == null) {
                return new ResponseDTO(401, false, "유효하지 않은 토큰입니다.");
            }

            // 3. 사용자 조회
            UserEntity user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                return new ResponseDTO(404, false, "사용자를 찾을 수 없습니다.");
            }

            // 4. 닉네임 반환 성공
            return new ResponseDTO(200, true, user.getNickName());

        } catch (Exception e) {
            return new ResponseDTO(500, false, "서버 오류가 발생했습니다.");
        }
    }

    public ResponseEntity<ResponseDTO> getUserProfile(String nickName, String authorizationHeader) {

        // Bearer 제거
        String token = authorizationHeader.substring(7);

        // JWT 토큰에서 이메일 추출
        String userEmail = jwtUtil.extractEmail(token);

        // 현재 로그인 사용자
        UserEntity loginUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("로그인한 사용자를 찾을 수 없습니다."));

        // 프로필을 조회할 사용자
        UserEntity profileUser = userRepository.findByNickName(nickName)
                .orElseThrow(() -> new RuntimeException("해당 유저가 존재하지 않습니다."));

        // 게시글 수
        int postNums = postRepository.countByUser(profileUser);

        // 팔로워 수 (이 사람을 팔로우하는 사람 수)
        int followers = followRepository.countByFollowing(profileUser);

        // 팔로잉 수 (이 사람이 팔로우하는 사람 수)
        int followees = followRepository.countByFollower(profileUser);

        // 로그인한 유저가 이 사람을 팔로우 중인가?
        boolean isFollowee = followRepository.existsByFollowerAndFollowing(loginUser, profileUser);

        // 로그인한 유저가 본인인가?
        boolean isYou = loginUser.getId().equals(profileUser.getId());

        // 인사말 (기본값 / 프로필에서 따로 저장해뒀으면 가져오면 됨)
        String article = "안녕하세요! 인사말이에요.";

        // 응답 데이터 맵에 담기
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("isYou", isYou);
        responseData.put("isFollowee", isFollowee);
        responseData.put("postNums", postNums);
        responseData.put("followers", followers);
        responseData.put("followees", followees);
        responseData.put("article", article);

        // ResponseDTO 만들어서 ResponseEntity로 감싸서 반환
        ResponseDTO responseDTO = new ResponseDTO(200, true, "프로필 조회 성공" ,responseData);

        return ResponseEntity.ok(responseDTO);
    }
}