package com.quiztech.quizservice.validators;

import com.quiztech.quizservice.dto.QuizRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class QuizValidator {

    public static List<String> isValid(QuizRequest request) {
        List<String> errors= new ArrayList<>();

        if (Objects.isNull(request.getTitle())) {
            errors.add("title required!");
        }
        if (Objects.isNull(request.getNumberOfQuestions())) {
            errors.add("number of questions required!");
        }
        if (Objects.isNull(request.getCategoryId())) {
            errors.add("categoryId required!");
        }
        return errors;
    }
}
