package com.example.snsClone.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "follow")
public class FollowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 팔로우 하는 사람
    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    private UserEntity follower;

    // 팔로우 당하는 사람
    @ManyToOne
    @JoinColumn(name = "following_id", nullable = false)
    private UserEntity following;

    public FollowEntity(UserEntity follower, UserEntity following) {
        this.follower = follower;
        this.following = following;
    }
}