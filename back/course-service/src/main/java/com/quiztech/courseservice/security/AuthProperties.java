package com.quiztech.courseservice.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;
@Configuration
@Getter @Setter
@Validated
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class AuthProperties {
    private String resourceId;
    private String principalAttribute;
}
