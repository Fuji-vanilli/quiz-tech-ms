package com.quiztech.resultquizservice.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter @Setter
@Configuration
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class AuthConverterProperties {
    private String resourceId;
    private String principalAttribute;
}
