package com.example.snsClone.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
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
}
