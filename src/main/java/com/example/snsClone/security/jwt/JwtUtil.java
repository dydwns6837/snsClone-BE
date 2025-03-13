package com.example.snsClone.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "yunoAndDydwnsSnsCloneProjectSecretKeyIsLongNeverSearch";

    // JWT 토큰 생성
    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                //.setIssuedAt(new Date())
                //.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1시간 유효 코드이지만 우선은 무한으로.
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // JWT 토큰 검증 및 이메일 반환
    public static String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }
}