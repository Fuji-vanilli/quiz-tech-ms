package com.quiztech.quizservice.webClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class WebClientGetter {
    private final WebClient.Builder webClient;
    private final WebClientUrlServiceProperties properties;

    public String addQuizToCategory(Map<String, String> requestPatch) {

        return webClient.build().patch()
                .uri(properties.getCategoryUrlPatch())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestPatch)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
