package com.quiztech.questionservice.webClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;

@Configuration
public class WCConfig {
    @Bean
    public WebClient.Builder webClient() {

        return WebClient.builder()
                .filter(addJwtToken());
    }

    private ExchangeFilterFunction addJwtToken() {
        return (clientRequest, next)->  {
            ClientRequest clientRequestWithToken= ClientRequest.from(clientRequest)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer "+getToken())
                    .build();

            return next.exchange(clientRequestWithToken);
        };
    }

    private String getToken() {
        String token= null;
        final Authentication authentication= SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuthenticationToken) {
            token= jwtAuthenticationToken.getToken().getTokenValue();
        }

        return token;
    }
}
