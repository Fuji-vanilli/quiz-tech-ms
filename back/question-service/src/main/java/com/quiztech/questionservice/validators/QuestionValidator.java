package com.quiztech.questionservice.validators;

import com.quiztech.questionservice.dto.QuestionRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class QuestionValidator {

    public static List<String> isValid(QuestionRequest request) {
        List<String> errors= new ArrayList<>();

        if (Objects.isNull(request.getContent())) {
            errors.add("content required!");
        }
        if (Objects.isNull(request.getQuizId())) {
            errors.add("quiz id  required!");
        }
        if (Objects.isNull(request.getOptions())) {
            errors.add("options required!");
        }
        return errors;
    }
}
