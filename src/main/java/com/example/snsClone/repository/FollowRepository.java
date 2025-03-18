package com.example.snsClone.repository;

import com.example.snsClone.entity.FollowEntity;
import com.example.snsClone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {

    int countByFollower(UserEntity follower);

    int countByFollowing(UserEntity following);

    boolean existsByFollowerAndFollowing(UserEntity follower, UserEntity following);

    Optional<FollowEntity> findByFollowerAndFollowing(UserEntity follower, UserEntity following);

    List<FollowEntity> findAllByFollowing(UserEntity following);

}
