package com.example.snsClone.repository;

import com.example.snsClone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByNickName(String nickName);
    Optional<UserEntity> findByEmailOrPhoneNumber(String email, String phoneNumber);
}