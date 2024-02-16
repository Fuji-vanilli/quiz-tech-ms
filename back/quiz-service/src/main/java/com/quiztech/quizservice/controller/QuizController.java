package com.quiztech.quizservice.controller;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface QuizController {
    @PostMapping("add")
    ResponseEntity<Response> add(@RequestBody QuizRequest request);
    @PatchMapping("addQuestion")
    ResponseEntity<Response> addQuestion(@RequestBody Map<String, String> questionRequest);
    @PutMapping("update")
    ResponseEntity<Response> update(@RequestBody QuizRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<Response> get(@PathVariable String id);
    @GetMapping("getByCategory/{idCategory}")
    ResponseEntity<Response> getByCategory(@PathVariable String idCategory);
    @GetMapping("all")
    ResponseEntity<Response> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    );
    @DeleteMapping("delete/{id}")
    ResponseEntity<Response> delete(@PathVariable String id);
}
