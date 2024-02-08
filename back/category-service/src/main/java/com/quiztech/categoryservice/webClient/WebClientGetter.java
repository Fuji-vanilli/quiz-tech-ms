package com.quiztech.categoryservice.webClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiztech.categoryservice.models.Quiz;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;


@Configuration
@RequiredArgsConstructor
@Slf4j
public class WebClientGetter {
    private final WebClient.Builder webClient;
    private final WebClientUrlServiceProperties urlServiceProperties;

    public Quiz getQuiz(String id) {

        final CompletableFuture<String> dataFuture = webClient.build().get()
                .uri(urlServiceProperties.getQuizUrlGet()+"/"+id)
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
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            quiz = objectMapper.readValue(dataBrute, Quiz.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error to deserilize the data from Quiz service!!!");
        }
        return quiz;
    }

    public List<Quiz> quizzesByCategory(String categoryId) {
        CompletableFuture<String> dataFuture = webClient.build().get()
                .uri(urlServiceProperties.getQuizUrlCategory() + "/" + categoryId)
                .retrieve()
                .bodyToMono(String.class)
                .toFuture();

        List<Quiz> quizzes= new ArrayList<>();
        String dataBrute= "";
        JSONArray results= null;

        try {
            dataBrute= dataFuture.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("error to fetch the dataFuture!!!");
        }

        ObjectMapper objectMapper= new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            JSONObject jsonObject = new JSONObject(dataBrute);
            JSONObject data= jsonObject.getJSONObject("data");
            results= data.getJSONArray("quizzes");
        } catch (JSONException e) {
            throw new RuntimeException("error to deserialize jsonArray and jsonObject!!!");
        }

        try {
            Quiz[] quizzesArray = objectMapper.readValue(results.toString(), Quiz[].class);
            quizzes.addAll(Arrays.asList(quizzesArray));
            log.info("les quizzes recuperé: {}", dataBrute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error to deserialize the data from quiz service!!!");
        }

        return quizzes;
    }
}
