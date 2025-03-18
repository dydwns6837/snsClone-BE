package com.example.snsClone.controller;

import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FollowController {

    private final FollowService followService;

    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    // 팔로우하기
    @PostMapping("/users/{userId}/follow")
    public ResponseEntity<ResponseDTO> followUser(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return followService.follow(nickName, authorizationHeader);
    }

    // 언팔로우하기
    @DeleteMapping("/users/{userId}/follow")
    public ResponseEntity<ResponseDTO> unfollowUser(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return followService.unfollow(nickName, authorizationHeader);
    }

    @GetMapping("/users/{userId}/followers")
    public ResponseEntity<ResponseDTO> getFollowers(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return followService.getFollowers(nickName, authorizationHeader);
    }


}