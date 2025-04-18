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

    //팔로워 목록조회
    @GetMapping("/users/{userId}/followers")
    public ResponseEntity<ResponseDTO> getFollowers(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return followService.getFollowers(nickName, authorizationHeader);
    }

    //팔로잉 목록조회
    @GetMapping("/users/{userId}/followings")
    public ResponseEntity<ResponseDTO> getFollowings(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return followService.getFollowings(nickName, authorizationHeader);
    }


    // 로그인 사용자 기준 팔로워 삭제
    @DeleteMapping("/users/{userId}/removeFollower")
    public ResponseEntity<ResponseDTO> removeFollower(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return followService.removeFollower(nickName, authorizationHeader);
    }


}