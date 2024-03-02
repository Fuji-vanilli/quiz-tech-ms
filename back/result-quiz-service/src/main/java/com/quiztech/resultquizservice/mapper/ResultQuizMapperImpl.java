package com.quiztech.resultquizservice.mapper;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;
import com.quiztech.resultquizservice.dto.ResultQuizResponse;
import com.quiztech.resultquizservice.entities.ResultQuiz;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResultQuizMapperImpl implements ResultQuizMapper{
    @Override
    public ResultQuiz mapToResultQuiz(ResultQuizRequest request) {
        return ResultQuiz.builder()
                .quizId(request.getQuizId())
                .rate(request.getRate())
                .emailUser(request.getEmailUser())
                .build();
    }

    @Override
    public ResultQuizResponse mapToResultQuizResponse(ResultQuiz resultQuiz) {
        return ResultQuizResponse.builder()
                .id(resultQuiz.getId())
                .quizId(resultQuiz.getQuizId())
                .createdDate(resultQuiz.getCreatedDate())
                .frequency(resultQuiz.getFrequency())
                .lastUpdateDate(resultQuiz.getLastUpdateDate())
                .rate(resultQuiz.getRate())
                .emailUser(resultQuiz.getEmailUser())
                .quiz(resultQuiz.getQuiz())
                .build();
    }
}
