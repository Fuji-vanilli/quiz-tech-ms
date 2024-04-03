package com.quiztech.courseservice.validators;

import com.quiztech.courseservice.dto.CourseRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CourseValidator {

    public static List<String> isValid(CourseRequest request) {
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
