package com.example.snsClone.service;

import com.example.snsClone.dto.ResponseDTO;
import com.example.snsClone.entity.FollowEntity;
import com.example.snsClone.entity.UserEntity;
import com.example.snsClone.repository.FollowRepository;
import com.example.snsClone.repository.UserRepository;
import com.example.snsClone.security.jwt.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public FollowService(FollowRepository followRepository, UserRepository userRepository, JwtUtil jwtUtil) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // 팔로우하기
    @Transactional
    public ResponseEntity<ResponseDTO> follow(String nickName, String authorizationHeader) {

        try {
            // 1. 토큰에서 Bearer 제거
            String token = authorizationHeader.substring(7);

            // 2. JWT에서 이메일 추출
            String userEmail = jwtUtil.extractEmail(token);

            // 3. 로그인한 사용자 찾기
            UserEntity loginUser = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("로그인한 사용자를 찾을 수 없습니다."));

            // 4. 팔로우할 대상 사용자 찾기
            UserEntity targetUser = userRepository.findByNickName(nickName)
                    .orElseThrow(() -> new IllegalArgumentException("팔로우 대상 사용자를 찾을 수 없습니다."));

            // 5. 자기 자신 팔로우 방지
            if (loginUser.getId().equals(targetUser.getId())) {
                return ResponseEntity.badRequest().body(new ResponseDTO(400, false, "자기 자신을 팔로우할 수 없습니다."));
            }

            // 6. 이미 팔로우했는지 체크
            boolean isAlreadyFollow = followRepository.existsByFollowerAndFollowing(loginUser, targetUser);
            if (isAlreadyFollow) {
                return ResponseEntity.badRequest().body(new ResponseDTO(400, false, "이미 팔로우한 사용자입니다."));
            }

            // 7. 팔로우 엔티티 생성 및 저장
            FollowEntity follow = new FollowEntity(loginUser, targetUser);
            followRepository.save(follow);

            // 8. 성공 응답
            return ResponseEntity.ok(new ResponseDTO(200, true, "팔로우 성공"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseDTO(500, false, "팔로우 중 오류 발생"));
        }
    }

    // 언팔로우하기
    @Transactional
    public ResponseEntity<ResponseDTO> unfollow(String nickName, String authorizationHeader) {

        try {
            // 1. 토큰에서 Bearer 제거
            String token = authorizationHeader.substring(7);

            // 2. JWT에서 이메일 추출
            String userEmail = jwtUtil.extractEmail(token);

            // 3. 로그인한 사용자 찾기
            UserEntity loginUser = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("로그인한 사용자를 찾을 수 없습니다."));

            // 4. 언팔로우할 대상 사용자 찾기
            UserEntity targetUser = userRepository.findByNickName(nickName)
                    .orElseThrow(() -> new IllegalArgumentException("언팔로우 대상 사용자를 찾을 수 없습니다."));


            // 5. 팔로우 엔티티 찾기
            FollowEntity follow = followRepository.findByFollowerAndFollowing(loginUser, targetUser)
                    .orElseThrow(() -> new RuntimeException("팔로우 관계없음"));


            //6 삭제
            followRepository.delete(follow);


            // 7. 성공 응답
            return ResponseEntity.ok(new ResponseDTO(200, true, "언팔로우 성공"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseDTO(500, false, "언팔로우 중 오류 발생"));
        }
    }

    public ResponseEntity<ResponseDTO> getFollowers (String nickName, String authorizationHeader) {
        try {
            // 1 토큰 꺼내 오기(bearer 제거, substring으로 7번문자전까지.)
            String token = authorizationHeader.substring(7);

            // 2 꺼내온 토큰을 userEmail에 담기.
            String userEmail = jwtUtil.extractEmail(token);

            // 3 userEmail을 저장된 repository에 있는 메일인지 비교.
            UserEntity loginUser = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("로그인한 사용자를 찾을 수 없습니다."));

            // 4. 대상 유저 찾기
            UserEntity targetUser = userRepository.findByNickName(nickName)
                    .orElseThrow(() -> new RuntimeException("대상 유저를 찾을 수 없습니다."));

            // 5. 팔로워 목록 조회
            List<FollowEntity> followers = followRepository.findAllByFollowing(targetUser);

            // 6. 팔로워 목록에서 유저 정보 추출
            List<Map<String, String>> followerList = followers.stream()
                    .map(f -> {
                        Map<String, String> map = new HashMap<>();
                        map.put("userID", f.getFollower().getNickName());
                        return map;
                    })
                    .toList();

            return ResponseEntity.ok(new ResponseDTO(200, true, "팔로워 목록 조회", followerList));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseDTO(500, false, "팔로워 목록 조회 실패"));
        }
    }

    public ResponseEntity<ResponseDTO> getFollowings(String nickName, String authorizationHeader) {
        try {
            // 1. 토큰꺼내오기 (3/20 일인 오늘까지만 이방법으로 토큰 가져오고 이후에는 filter공부해서 편하게 가져오기)
            // 그런김에 주석으로 총정리겸 직접해보기.
            String token = authorizationHeader.substring(7);

            // 2. 꺼내온 토큰을 jwtuiil에서 해독후에 변수에 담기(왜? 인가된 사용자 인지 확인하려고)
            String userEmail = jwtUtil.extractEmail(token);

            // 3. userEmail이 db에 저장되어 로그인한 이메일이랑 똑같은지 비교
            UserEntity loginUser = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException(""));

            // 4. db에 저장된 닉네임으로 대상 찾기.
            UserEntity targetUser = userRepository.findByNickName(nickName)
                    .orElseThrow(() -> new RuntimeException(""));

            // 5. 팔로잉 목록 조회
            List<FollowEntity> followings = followRepository.findAllByFollower(targetUser);

            // 6. 팔로잉 목록에서 targetUser의 정보를 map에 담아 뿌리기
            List<Map<String, String>> followingList = followings.stream()
                    .map(f -> {
                        Map<String, String> map = new HashMap<>();
                        map.put("userID", f.getFollowing().getNickName());
                        return map;
                    })
                    .toList();
            return ResponseEntity.ok(new ResponseDTO(200, true, "팔로잉 목록 조회", followingList));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseDTO(500, false, "팔로잉 목록 조회 실패"));
        }
    }

    public ResponseEntity<ResponseDTO> removeFollower (String nickName, String authorizationHeader) {
        try {
            // 1. 토큰에서 Bearer 제거
            String token = authorizationHeader.substring(7);

            // 2. JWT에서 이메일 추출
            String userEmail = jwtUtil.extractEmail(token);

            // 3. 로그인한 사용자 찾기
            UserEntity loginUser = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("로그인한 사용자를 찾을 수 없습니다."));

            // 4. 팔로우한 사용자 찾기
            UserEntity targetUser = userRepository.findByNickName(nickName)
                    .orElseThrow(() -> new IllegalArgumentException("팔로우한 대상 사용자를 찾을 수 없습니다."));

            // 5. 팔로워 엔티티 찾기
            FollowEntity follow = followRepository.findByFollowerAndFollowing(targetUser, loginUser)
                    .orElseThrow(() -> new RuntimeException("팔로우 관계없음"));

            //6 삭제
            followRepository.delete(follow);

            // 7. 성공 응답
            return ResponseEntity.ok(new ResponseDTO(200, true, "언팔로우 성공"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseDTO(500, false, "언팔로우 중 오류 발생"));
        }
    }
}