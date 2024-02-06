package com.quiztech.categoryservice.security;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@Getter
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class AuthProperties {
    private String resourceId;
    private String principalAttribute;
}
