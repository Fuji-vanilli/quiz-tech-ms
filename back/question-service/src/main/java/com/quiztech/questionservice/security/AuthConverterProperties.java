package com.quiztech.questionservice.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@Validated
@Getter @Setter
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class AuthConverterProperties {
    private String resourceId;
    private String principalAttribute;
}
