package com.quiztech.categoryservice.controller;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.models.Quiz;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

public interface CategoryController {
    @PostMapping("add")
    ResponseEntity<CategoryResponse> add( @RequestBody CategoryRequest request);
    @PatchMapping("addQuiz")
    ResponseEntity<CategoryResponse> addQuizId(@RequestBody Map<String, String> patchRequest);
    @GetMapping("get/{id}")
    ResponseEntity<CategoryResponse> get(@PathVariable String id);
    @GetMapping("all")
    ResponseEntity<List<CategoryResponse>> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    );
    @DeleteMapping("delete/{id}")
    ResponseEntity<Boolean> delete(@PathVariable String id);

    @GetMapping("test")
    ResponseEntity<List<Quiz>> getQuiz();
}
