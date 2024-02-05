package com.quiztech.categoryservice.controller;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface CategoryController {
    @PostMapping("add")
    ResponseEntity<CategoryResponse> add( @RequestBody CategoryRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<CategoryResponse> get(@PathVariable String id);
    @GetMapping("all")
    ResponseEntity<CategoryResponse> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    );
    @DeleteMapping("delete/{id}")
    ResponseEntity<CategoryResponse> delete(@PathVariable String id);
}
