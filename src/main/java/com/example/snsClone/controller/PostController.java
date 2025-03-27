package com.example.snsClone.controller;

import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/users/{userId}/posts")
    public ResponseEntity<ResponseDTO> getAllPost(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return postService.getAllPost(nickName, authorizationHeader);
    }

    @GetMapping("/posts/{postID}")
    public ResponseEntity<ResponseDTO> getDetailPosts(
            @PathVariable("postID") Long postID,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return postService.getDetailPosts(postID, authorizationHeader);
    }

    @PostMapping("/posts/{postId}/like")
    public ResponseEntity<ResponseDTO> toggleLike(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long postId) {

        return postService.toggleLike(authorizationHeader, postId);
    }
}
