package com.example.snsClone.controller;

import com.example.snsClone.dto.LoginRequestDTO;
import com.example.snsClone.dto.LoginResponseDTO;
import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.dto.SignupRequestDTO;
import com.example.snsClone.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// 깃에 추가
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/users")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody SignupRequestDTO request) {
        ResponseDTO response = authService.registerUser(request);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = authService.login(request);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}