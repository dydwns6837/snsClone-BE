package com.example.snsClone.controller;

import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 사용자의 전체 게시글 조회
    @GetMapping("/users/{userId}/posts")
    public ResponseEntity<ResponseDTO> getAllPost(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return postService.getAllPost(nickName, authorizationHeader);
    }

    // 게시글 상세 정보(눌렀을때 그 특정 게시글) 조회
    @GetMapping("/posts/{postID}")
    public ResponseEntity<ResponseDTO> getDetailPosts(
            @PathVariable("postID") Long postID,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return postService.getDetailPosts(postID, authorizationHeader);
    }

    // 토글방식으로 좋아요/좋아요 취소
    @PostMapping("/posts/{postId}/like")
    public ResponseEntity<ResponseDTO> toggleLike(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long postId) {

        return postService.toggleLike(authorizationHeader, postId);
    }

    // 좋아요 누른 사용자들 목록 조회
    @GetMapping("/posts/{postId}/userLikes")
    public ResponseDTO getUserLikes(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long postId) {

        return postService.getUserLikes(authorizationHeader, postId);
    }

    // 게시글에 댓글 추가
    @PostMapping("/posts/{postId}/newComments")
    public ResponseEntity<ResponseDTO> addComments(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long postId,
            @RequestBody Map<String, String> requestBody) {
            // 지피티 선생님께서 map보다 dto로 담아서 보내는게 좋다고하셨찌만 map으로 해봤습니다.
        String commentText = requestBody.get("context");
        return postService.addComments(authorizationHeader, postId, commentText);
    }

    @DeleteMapping("/posts/{postID}")
    public ResponseEntity<ResponseDTO> deletePosts(
            @PathVariable("postID") Long postID,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return postService.deletePosts(postID, authorizationHeader);
    }
}
