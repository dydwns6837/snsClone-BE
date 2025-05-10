package com.example.snsClone.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Setter
@Table(name = "post")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 작성한 사용자 (글쓴이)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String image;
    private String context;

    @OneToMany(mappedBy = "post")
    private List<CommentEntity> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    // cascade entity의 상태 변화를 전파 시키는 옵션
    // orphanRemoval 연관 관계가 사라진, 고아가 된 entity를 삭제. (게시글을 삭제하면 이미지들도 같이 삭제되게끔.)
    private List<PostImageEntity> images = new ArrayList<>();

    private LocalDateTime createdAt;
}

