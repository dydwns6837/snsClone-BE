package com.example.snsClone.service;

import com.example.snsClone.dto.LoginRequestDTO;
import com.example.snsClone.dto.LoginResponseDTO;
import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.dto.SignupRequestDTO;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.repository.UserRepository;
import com.example.snsClone.security.jwt.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService (UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseDTO registerUser(SignupRequestDTO request) {
        if (userRepository.findByNickName(request.getNickName()).isPresent()) {
            return new ResponseDTO(400, false, "이미 사용중인 닉네임입니다.");
        }
        if (userRepository.findByEmailOrPhoneNumber(request.getEmail(), request.getPhoneNumber()).isPresent()) {
            return new ResponseDTO(400, false, "이미 가입된 사용자입니다.");
        }

        UserEntity user = new UserEntity();
        user.setNickName(request.getNickName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setName(request.getName());

        userRepository.save(user);
        return new ResponseDTO(200, true, "회원가입 성공!");
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        Optional<UserEntity> user = userRepository.findByEmailOrPhoneNumber(request.getContact(), request.getContact());

        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            String token = JwtUtil.generateToken(user.get().getEmail()); // 이메일을 토큰 subject로 사용
            return new LoginResponseDTO(200, true, "로그인 성공! 환영합니다, " + user.get().getNickName() + "님!", token);
        }

        return new LoginResponseDTO(400, false, "로그인 실패! 이메일(전화번호)와 비밀번호를 확인하세요.",null);
    }
}