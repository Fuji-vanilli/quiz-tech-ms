package com.quiztech.resultquizservice.service;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;
import com.quiztech.resultquizservice.utils.Response;

import java.util.Map;

public interface ResultQuizService {
    Response add(ResultQuizRequest request);
    Response updateRate(Map<String, Object> rate);
    Response get(String id);
    Response getByUserEmail(String emailUser);
    Response all();
    Response delete(String id);
}
