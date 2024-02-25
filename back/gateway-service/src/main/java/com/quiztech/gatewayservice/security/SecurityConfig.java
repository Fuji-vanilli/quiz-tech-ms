package com.quiztech.gatewayservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain filterChain(ServerHttpSecurity httpSecurity) {
        httpSecurity
                .authorizeExchange(auth-> auth.anyExchange().authenticated());

        httpSecurity
                .cors(Customizer.withDefaults())
                .oauth2ResourceServer().jwt();

        return httpSecurity.build();
    }
}
