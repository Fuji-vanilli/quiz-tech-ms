package com.quiztech.quizservice.webClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import com.quiztech.quizservice.model.Category;
import com.quiztech.quizservice.model.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import netscape.javascript.JSObject;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

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

    public Category getCategory(String id) {
        CompletableFuture<String> dataFuture = webClient.build().get()
                .uri(properties.getCategoryUrlGet() + "/" + id)
                .retrieve()
                .bodyToMono(String.class)
                .toFuture();

        String dataBrute= "";
        Category category= null;

        try {
            dataBrute= dataFuture.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error to fetch dataFuture!!!");
        }

        ObjectMapper objectMapper= new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            JSONObject jsonObject= new JSONObject(dataBrute);
            JSONObject data = jsonObject.getJSONObject("data").getJSONObject("category");

            category= Category.builder()
                    .title(data.getString("title"))
                    .description(data.getString("description"))
                    .build();

        } catch (JSONException e) {
            throw new RuntimeException("Error to deserialize the data from the category service!!!");
        }

        return category;
    }

    public List<Question> getQuestionsByQuiz(String quizId) {
        CompletableFuture<String> dataFuture = webClient.build().get()
                .uri(properties.getQuestionUrlByQuiz() + "/" + quizId)
                .retrieve()
                .bodyToMono(String.class)
                .toFuture();

        String dataBrute= "";
        List<Question> results= new ArrayList<>();

        try {
            dataBrute= dataFuture.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("error to fetch the data future!!!");
        }

        JSONArray jsonArray= new JSONArray();
        ObjectMapper objectMapper= new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);

        try {
            JSONObject jsonObject= new JSONObject(dataBrute);
            jsonArray= jsonObject.getJSONObject("data").getJSONArray("questions");

            Question[] questions = objectMapper.readValue(jsonArray.toString(), Question[].class);
            results= Arrays.asList(questions);

        } catch (JSONException | JsonProcessingException e) {
            throw new RuntimeException("Error to deserialize the data!!!");
        }

        return results;
    }
}
