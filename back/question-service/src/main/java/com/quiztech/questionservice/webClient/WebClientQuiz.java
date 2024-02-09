package com.quiztech.questionservice.webClient;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Configuration
@RequiredArgsConstructor
public class WebClientQuiz {
    private final WebClientProperties properties;
    private final WebClient.Builder webClient;

    public Boolean addQuestionToQuiz(Map<String, String> questionRequest) {
        CompletableFuture<String> dataFuture = webClient.build().patch().uri(properties.getUrlQuizAddFromQuestion())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(questionRequest)
                .retrieve()
                .bodyToMono(String.class)
                .toFuture();

        String dataBrute= "";
        boolean isAdded= false;

        try {
            dataBrute= dataFuture.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error to fetch the data future!!!");
        }

        ObjectMapper objectMapper= new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            JSONObject object= new JSONObject(dataBrute);
            if (object.getInt("statusCode")== 200)
                isAdded= true;
        } catch (JSONException e) {
            throw new RuntimeException("error to deserialize the data from quiz service!!!");
        }

        return isAdded;
    }
}
