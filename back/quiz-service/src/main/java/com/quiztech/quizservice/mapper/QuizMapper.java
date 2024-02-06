package com.quiztech.quizservice.mapper;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;

public interface QuizMapper {
    Quiz mapToQuiz(QuizRequest request);
    QuizResponse mapToQuizResponse(Quiz quiz);
}
