package com.quiztech.quizservice.controller;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

public interface QuizController {
    @PostMapping("add")
    ResponseEntity<QuizResponse> add(@RequestBody QuizRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<QuizResponse> get(@PathVariable String id);
    @GetMapping("all")
    ResponseEntity<Collection<QuizResponse>> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    );
    @DeleteMapping("delete/{id}")
    ResponseEntity<Boolean> delete(@PathVariable String id);
}
