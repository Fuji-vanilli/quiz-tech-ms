package com.quiztech.userservice.controller;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.services.UserService;
import com.quiztech.userservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static com.quiztech.userservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserApi implements UserController {

    private final UserService userService;

    @Override
    public ResponseEntity<Response> add(UserRequest request) {
        return ResponseEntity.ok(userService.add(request));
    }

    @Override
    public ResponseEntity<Response> update(UserRequest request) {
        return ResponseEntity.ok(userService.update(request));
    }

    @Override
    public ResponseEntity<Response> get(String email) {
        return ResponseEntity.ok(userService.get(email));
    }

    @Override
    public ResponseEntity<Response> all() {
        return ResponseEntity.ok(userService.all());
    }

    @Override
    public ResponseEntity<Response> delete(String id) {
        return ResponseEntity.ok(userService.delete(id));
    }

    @Override
    public ResponseEntity<Response> toSubscribe(Map<String, String> email) {
        return ResponseEntity.ok(userService.toSubscribe(email));
    }
}
