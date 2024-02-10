package com.quiztech.quizservice.mapper;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuizMapperImpl implements QuizMapper{

    @Override
    public Quiz mapToQuiz(QuizRequest request) {
        return Quiz.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .marks(request.getMarks())
                .numberOfQuestions(request.getNumberOfQuestions())
                .active(request.isActive())
                .categoryId(request.getCategoryId())
                .build();
    }

    @Override
    public QuizResponse mapToQuizResponse(Quiz quiz) {
        return QuizResponse.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .active(quiz.isActive())
                .marks(quiz.getMarks())
                .numberOfQuestions(quiz.getNumberOfQuestions())
                .categoryId(quiz.getCategoryId())
                .category(quiz.getCategory())
                .questionsId(quiz.getQuestionsId())
                .build();
    }
}
