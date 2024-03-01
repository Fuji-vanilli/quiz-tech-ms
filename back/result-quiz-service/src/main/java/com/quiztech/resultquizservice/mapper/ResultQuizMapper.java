package com.quiztech.resultquizservice.mapper;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;
import com.quiztech.resultquizservice.dto.ResultQuizResponse;
import com.quiztech.resultquizservice.entities.ResultQuiz;

public interface ResultQuizMapper {
    ResultQuiz mapToResultQuiz(ResultQuizRequest request);
    ResultQuizResponse mapToResultQuizResponse(ResultQuiz resultQuiz);
}
