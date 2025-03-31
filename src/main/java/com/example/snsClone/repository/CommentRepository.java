package com.example.snsClone.repository;

import com.example.snsClone.entity.CommentEntity;
import com.example.snsClone.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    int countByPost(PostEntity post); // 댓글 수 카운트
}
