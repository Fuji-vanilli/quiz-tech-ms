package com.quiztech.userservice.webClient;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiztech.userservice.models.ResultSummary;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class WebClientGetter {

    private final WebClient.Builder webClient;
    private final WebClientProperties properties;

    public List<ResultSummary> getResult(String email) {
        return webClient.build().get()
                .uri(properties.getResultQuiz() + "/resultSummary/" + email)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<ResultSummary>>() {
                })
                .block();

    }
}
