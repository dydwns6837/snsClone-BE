package com.example.snsClone.controller;



import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.dto.SignupRequestDTO;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//테스트
// 두번째 수정
// 
// 네번째 커밋
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/my")
    public ResponseEntity<UserEntity> getUser() {
        return ResponseEntity.ok(userService.getUserInfo());
        // 성공하는 의미인 200상태와, userService.getUserInfo()를 리턴.
    }

    @PutMapping("/my")
    public ResponseEntity<UserEntity> updateUser(@RequestBody SignupRequestDTO request) {
        return ResponseEntity.ok(userService.updateUser(request));
    }

    @DeleteMapping("/my")
    public ResponseEntity<String> deleteUser() {
        userService.deleteUser();
        return ResponseEntity.ok("회원 탈퇴 완료");
    }

    @GetMapping("/userID")
    public ResponseEntity<ResponseDTO> getMyNickname(@RequestHeader("Authorization") String token) {

        // 핵심 로직은 서비스에 위임
        ResponseDTO response = userService.getNicknameByToken(token);

        // 상태 코드와 응답 반환
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<ResponseDTO> getUserProfile(
            @PathVariable("userId") String nickName,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        return userService.getUserProfile(nickName, authorizationHeader);
    }
}