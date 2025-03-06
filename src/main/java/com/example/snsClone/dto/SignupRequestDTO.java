package com.example.snsClone.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDTO {
    private String nickName;
    private String password;
    private String name;
    private String phoneNumber;
    private String email;
}