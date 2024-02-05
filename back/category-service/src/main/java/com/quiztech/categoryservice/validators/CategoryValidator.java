package com.quiztech.categoryservice.validators;

import com.quiztech.categoryservice.dto.CategoryRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CategoryValidator {

    public static List<String> isValid(CategoryRequest request) {
        List<String> errors= new ArrayList<>();

        if (Objects.isNull(request.getTitle())) {
            errors.add("title required!");
        }
        if (Objects.isNull(request.getDescription())) {
            errors.add("description required!");
        }
        return errors;
    }
}
