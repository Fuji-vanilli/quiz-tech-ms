package com.quiztech.questionservice.services;

import com.quiztech.questionservice.dto.QuestionRequest;
import com.quiztech.questionservice.dto.QuestionResponse;
import com.quiztech.questionservice.utils.Response;

public interface QuestionService {
    Response add(QuestionRequest request);
    Response get(String id);
    Response allByQuizId(String quizId);
    Response all(int page, int size);
    Response delete(String id);
}
