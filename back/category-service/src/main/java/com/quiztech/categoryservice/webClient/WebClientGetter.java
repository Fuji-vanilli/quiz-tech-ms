package com.quiztech.categoryservice.webClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiztech.categoryservice.models.Quiz;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class WebClientGetter {
    private final WebClient.Builder webClient;
    private final WebClientUrlServiceProperties urlServiceProperties;

    public Quiz getQuiz(String id) {
        CompletableFuture<String> dataFuture = webClient.build().get().uri(urlServiceProperties.quizUrlGet + "/id")
                .retrieve()
                .bodyToMono(String.class)
                .toFuture();

        Quiz quiz= new Quiz();
        String dataBrute= "";

        try {
            dataBrute= dataFuture.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("error to fetch the dataFuture!!!");
        }

        ObjectMapper objectMapper= new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);

        try {
            quiz = objectMapper.readValue(dataBrute, Quiz.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error to deserilize the data from Quiz service!!!");
        }


        return quiz;
    }
}
