package com.quiztech.userservice.services;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.utils.Response;

import java.util.Map;

public interface UserService {
    Response add(UserRequest request);
    Response update(UserRequest request);
    Response get(String email);
    Response all();
    Response delete(String email);
    Response toSubscribe(Map<String, String> email);
    Response unsubscribe(Map<String, String> email);
    Response addRole(String email);
}
