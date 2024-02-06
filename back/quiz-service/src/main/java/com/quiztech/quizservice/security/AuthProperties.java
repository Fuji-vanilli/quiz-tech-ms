package com.quiztech.quizservice.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@Validated
@Getter @Setter
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class AuthProperties {
    private String resourceId;
    private String principalAttribute;
}
