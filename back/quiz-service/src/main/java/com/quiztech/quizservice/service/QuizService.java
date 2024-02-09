package com.quiztech.quizservice.service;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;
import com.quiztech.quizservice.utils.Response;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface QuizService {
    Response add(QuizRequest request);
    Response addQuestion(Map<String, String> questionRequest);
    Response get(String id);
    Response quizByCategory(String idCategory);
    Response all(int page, int size);
    Response delete(String id);
}
