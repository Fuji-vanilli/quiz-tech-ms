package com.quiztech.userservice.services;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.utils.Response;

public interface UserService {
    Response add(UserRequest request);
    Response update(UserRequest request);
    Response get(String email);
    Response all();
    Response delete(String email);
    Response toSubscribe(String emailSubscriber, String emailToSubscribe);
}
