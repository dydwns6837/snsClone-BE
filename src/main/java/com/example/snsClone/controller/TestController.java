package com.example.snsClone.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
// 테스트
@RestController
@RequestMapping("/hello")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @GetMapping
    public Map<String, String> sayHello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "연결 성공! React에서 보낸 요청을 받았어요!");
        return response;  // JSON 형태로 응답
    }
}
