package com.example.snsClone.service;

import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.dto.SignupRequestDTO;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.repository.UserRepository;
import com.example.snsClone.security.jwt.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
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
}