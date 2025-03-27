package com.example.snsClone.repository;

import com.example.snsClone.entity.PostEntity;
import com.example.snsClone.entity.PostLikeEntity;
import com.example.snsClone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLikeEntity, Long> {

    boolean existsByUserAndPost(UserEntity user, PostEntity post);

    int countByPost(PostEntity post);

    Optional<PostLikeEntity> findByUserAndPost(UserEntity user, PostEntity post);
}
