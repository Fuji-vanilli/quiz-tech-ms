package com.quiztech.quizservice.service;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;

import java.util.Collection;
import java.util.List;

public interface QuizService {
    QuizResponse add(QuizRequest request);
    QuizResponse get(String id);
    List<QuizResponse> quizByCategory(String idCategory);
    Collection<QuizResponse> all(int page, int size);
    Boolean delete(String id);
}
