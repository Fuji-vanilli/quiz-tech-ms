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
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .difficulty(request.getDifficulty())
                .marks(request.getMarks())
                .imageUrl(request.getImageUrl())
                .numberOfQuestions(request.getNumberOfQuestions())
                .duration(request.getDuration())
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
                .difficulty(quiz.getDifficulty())
                .active(quiz.isActive())
                .status(quiz.isStatus())
                .createdDate(quiz.getCreatedDate())
                .lastUpdateDate(quiz.getLastUpdateDate())
                .marks(quiz.getMarks())
                .imageUrl(quiz.getImageUrl())
                .duration(quiz.getDuration())
                .numberOfQuestions(quiz.getNumberOfQuestions())
                .categoryId(quiz.getCategoryId())
                .category(quiz.getCategory())
                .questionsId(quiz.getQuestionsId())
                .questions(quiz.getQuestions())
                .build();
    }
}
