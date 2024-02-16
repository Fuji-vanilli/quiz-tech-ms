package com.quiztech.categoryservice.controller;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.models.Quiz;
import com.quiztech.categoryservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

public interface CategoryController {
    @PostMapping("add")
    ResponseEntity<Response> add(@RequestBody CategoryRequest request);
    @PatchMapping("addQuiz")
    ResponseEntity<Response> addQuizId(@RequestBody Map<String, String> patchRequest);
    @PutMapping("update")
    ResponseEntity<Response> update(@RequestBody CategoryRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<Response> get(@PathVariable String id);
    @GetMapping("all")
    ResponseEntity<Response> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    );
    @DeleteMapping("delete/{id}")
    ResponseEntity<Response> delete(@PathVariable String id);

}
