package com.quiztech.questionservice.mapper;

import com.quiztech.questionservice.dto.QuestionRequest;
import com.quiztech.questionservice.dto.QuestionResponse;
import com.quiztech.questionservice.entities.Question;

public interface QuestionMapper {
    Question mapToQuestion(QuestionRequest request);
    QuestionResponse mapToQuestionResponse(Question question);
}
