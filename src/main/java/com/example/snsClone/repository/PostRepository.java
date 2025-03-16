package com.example.snsClone.repository;

import com.example.snsClone.entity.PostEntity;
import com.example.snsClone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {

    int countByUser(UserEntity user);
}