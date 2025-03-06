package com.example.snsClone.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDTO {
    private int status;   // HTTP 상태 코드 (200, 400, 401 등)
    private boolean success;  // 성공 여부
    private String message;   // 응답 메시지
}