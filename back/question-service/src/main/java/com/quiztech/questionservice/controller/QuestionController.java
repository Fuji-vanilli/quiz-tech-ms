package com.quiztech.questionservice.controller;


import com.quiztech.questionservice.dto.QuestionRequest;
import com.quiztech.questionservice.dto.QuestionResponse;
import com.quiztech.questionservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

public interface QuestionController {
    @PostMapping("add")
    ResponseEntity<Response> add(@RequestBody QuestionRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<Response> get(@PathVariable String id);
    @GetMapping("byQuiz")
    ResponseEntity<Response> allByQuiz(@PathVariable String quizId);
    @GetMapping("all")
    ResponseEntity<Response> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    );
    @DeleteMapping("delete/{id}")
    ResponseEntity<Response> delete(@PathVariable String id);
}
