package com.quiztech.resultquizservice.webClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient.Builder webClient() {
        return WebClient.builder()
                .filter(addJwtToken());
    }

    public ExchangeFilterFunction addJwtToken() {
        return (clientRequest, next)-> {
            ClientRequest clientRequestWithToken= ClientRequest.from(clientRequest)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer "+extractToken())
                    .build();

            return next.exchange(clientRequestWithToken);
        };
    }
    public String extractToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String token= "";

        if (authentication instanceof JwtAuthenticationToken jwtAuthenticationToken) {
            token = jwtAuthenticationToken.getToken().getTokenValue();
        }

        return token;
    }
}
