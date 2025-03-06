package com.example.snsClone.service;

import com.example.snsClone.dto.LoginRequestDTO;
import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.dto.SignupRequestDTO;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService (UserRepository userRepository) {
        this.userRepository = userRepository;
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
        user.setPassword(request.getPassword()); // 보안 강화 필요
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setName(request.getName());

        userRepository.save(user);
        return new ResponseDTO(200, true, "회원가입 성공!");
    }

    public ResponseDTO login(LoginRequestDTO request) {
        //
        Optional<UserEntity> user = userRepository.findByEmailOrPhoneNumber(request.getContact(), request.getContact());

        // 이메일 또는 전화번호가 존재하면서 비밀번호가 일치할때.
        if (user.isPresent() && user.get().getPassword().equals(request.getPassword())) {
            return new ResponseDTO(200, true, "로그인 성공! 환영합니다, " + user.get().getNickName() + "님!");
        }

        return new ResponseDTO(401, false, "로그인 실패! 이메일(전화번호)과(를) 비밀번호를 확인하세요.");
    }
}