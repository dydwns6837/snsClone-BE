package com.example.snsClone.repository;

import com.example.snsClone.entity.PostEntity;
import com.example.snsClone.entity.PostImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostImageRepository extends JpaRepository<PostImageEntity, Long> {

    // 특정 게시글에 속한 이미지들을 모두 조회
    List<PostImageEntity> findByPost(PostEntity post);
}