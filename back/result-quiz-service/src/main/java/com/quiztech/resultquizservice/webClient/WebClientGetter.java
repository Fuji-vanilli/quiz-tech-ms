package com.quiztech.resultquizservice.webClient;

import com.quiztech.resultquizservice.models.Quiz;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Configuration
@RequiredArgsConstructor
public class WebClientGetter {
    private final WebClient.Builder webClient;
    private final WebClientProperties properties;

    public Quiz getQuiz(String quizId) {
        CompletableFuture<String> dataFuture = webClient.build().get()
                .uri(properties.getQuizUrlGet()+"/"+quizId)
                .retrieve()
                .bodyToMono(String.class)
                .toFuture();

        String daraBrute= "";
        Quiz quiz;

        try {
            daraBrute= dataFuture.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("error to fetch data into future quiz!!!");
        }

        try {
            JSONObject jsonObject= new JSONObject(daraBrute);
            JSONObject data= jsonObject.getJSONObject("data").getJSONObject("quiz");

            quiz= Quiz.builder()
                    .title(data.getString("title"))
                    .description(data.getString("description"))
                    .difficulty(data.getString("difficulty"))
                    .build();

        } catch (JSONException e) {
            throw new RuntimeException("error to deserialize data into jsonobject!!!");
        }

        return quiz;
    }
}
