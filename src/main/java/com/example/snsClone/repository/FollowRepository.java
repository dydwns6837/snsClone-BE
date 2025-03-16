package com.example.snsClone.repository;

import com.example.snsClone.entity.FollowEntity;
import com.example.snsClone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {

    int countByFollower(UserEntity follower);

    int countByFollowing(UserEntity following);

    boolean existsByFollowerAndFollowing(UserEntity follower, UserEntity following);
}
