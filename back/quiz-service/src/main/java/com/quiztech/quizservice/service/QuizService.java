package com.quiztech.quizservice.service;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;

import java.util.Collection;

public interface QuizService {
    QuizResponse add(QuizRequest request);
    QuizResponse get(String id);
    Collection<QuizResponse> all(int page, int size);
    Boolean delete(String id);
}
