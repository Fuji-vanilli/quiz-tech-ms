package com.quiztech.userservice.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class AuthConverterProperties {
    private String resourceId;
    private String principalAttribute;
}
