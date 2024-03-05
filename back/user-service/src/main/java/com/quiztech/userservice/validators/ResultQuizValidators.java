package com.quiztech.userservice.validators;


import com.quiztech.userservice.dto.UserRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class UserValidators {

    public static List<String> isValid(UserRequest request) {
        List<String> errors= new ArrayList<>();

        if (Objects.isNull(request.getEmail())) {
            errors.add("email id required!");
        }

        if (Objects.isNull(request.getUsername())) {
            errors.add("username user required!");
        }
        return errors;
    }
}
