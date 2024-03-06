package com.quiztech.userservice.services;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.entities.User;
import com.quiztech.userservice.mapper.UserMapper;
import com.quiztech.userservice.repositories.UserRepository;
import com.quiztech.userservice.utils.Response;
import com.quiztech.userservice.validators.UserValidators;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Override
    public Response add(UserRequest request) {
        List<String> errors = UserValidators.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field required!");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    Map.of(
                            "errors", errors
                    ),
                    "some field required!!!!"
            );
        }

        User user = userMapper.mapToUser(request);


        return null;
    }

    @Override
    public Response update(UserRequest request) {
        return null;
    }

    @Override
    public Response get(String email) {
        return null;
    }

    @Override
    public Response all() {
        return null;
    }

    @Override
    public Response delete(String email) {
        return null;
    }

    private Response generateResponse(HttpStatus status, URI location, Map<?, ?> data, String message) {
        return Response.builder()
                .timeStamp(LocalDateTime.now())
                .status(status)
                .location(location)
                .statusCode(status.value())
                .data(data)
                .message(message)
                .build();
    }
}
