package com.quiztech.userservice.mapper;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.dto.UserResponse;
import com.quiztech.userservice.entities.User;

public interface UserMapper {
    User mapToUser(UserRequest request);
    UserResponse mapToUserResponse(User user);
}
