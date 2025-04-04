package com.example.snsClone.config;

import io.swagger.v3.oas.models.OpenAPI;
// import io.swagger.v3.oas.models.info.Contact; 내 정보를 담고 싶을때
// https://www.baeldung.com/spring-boot-swagger-jwt Spring boot 와 Swagger UI 로 jwt 설정 웹사이트
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// swagger 기본주소 http://localhost:8080/swagger-ui/index.html#/

@Configuration
public class SwaggerConfig {

    // JWT securityScheme를 구성
    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");
    }

    // OpenAPI 문서 정의 및 보안 설정 포함
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .addSecurityItem(
                        new SecurityRequirement().addList("Bearer Authentication")
                )
                .components(
                        new Components().addSecuritySchemes("Bearer Authentication", createAPIKeyScheme())
                )
                //여긴 그냥 설명
                .info(new Info()
                        .title("SNS Clone API")
                        .description("JWT 인증을 사용하는 SNS Clone 프로젝트 API 문서입니다.")
                        .version("1.0.0")

                );
    }
}