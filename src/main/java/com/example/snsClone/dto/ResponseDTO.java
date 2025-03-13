package com.example.snsClone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor // 세 개의 필드 전부 받는 생성자 자동 생성
@NoArgsConstructor  // 기본 생성자도 자동 생성
public class ResponseDTO {
    private int status;     // 상태 코드
    private boolean success; // 성공 여부
    private String message;  // 응답 메시지
}