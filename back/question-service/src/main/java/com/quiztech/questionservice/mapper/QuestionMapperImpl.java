package com.quiztech.questionservice.mapper;

import com.quiztech.questionservice.dto.QuestionRequest;
import com.quiztech.questionservice.dto.QuestionResponse;
import com.quiztech.questionservice.entities.Question;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuestionMapperImpl implements QuestionMapper{
    @Override
    public Question mapToQuestion(QuestionRequest request) {
        return Question.builder()
                .content(request.getContent())
                .id(request.getImage())
                .options(request.getOptions())
                .quizId(request.getQuizId())
                .build();
    }

    @Override
    public QuestionResponse mapToQuestionResponse(Question question) {
        return QuestionResponse.builder()
                .id(question.getId())
                .content(question.getContent())
                .createdDte(question.getCreatedDte())
                .lastUpdateDate(question.getLastUpdateDate())
                .image(question.getImage())
                .options(question.getOptions())
                .quizId(question.getId())
                .quiz(question.getQuiz())
                .build();
    }
}
