package com.quiztech.resultquizservice.validators;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ResultQuizValidators {

    public static List<String> isValid(ResultQuizRequest request) {
        List<String> errors= new ArrayList<>();

        if (Objects.isNull(request.getQuizId())) {
            errors.add("quiz id required!");
        }
        if (request.getRate()== null) {
            errors.add("rate required!");
        }
        if (Objects.isNull(request.getEmailUser())) {
            errors.add("email user required!");
        }
        return errors;
    }
}
