package com.example.snsClone.service;

import com.example.snsClone.dto.SignupRequestDTO;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}