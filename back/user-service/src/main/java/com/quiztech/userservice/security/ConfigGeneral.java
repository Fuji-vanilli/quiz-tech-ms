package com.quiztech.userservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

@Configuration
public class ConfigGeneral {
    @Bean
    JwtGrantedAuthoritiesConverter authoritiesConverter() {
        return new JwtGrantedAuthoritiesConverter();
    }
}
