package com.quiztech.categoryservice.controller;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.models.Quiz;
import com.quiztech.categoryservice.service.CategoryService;
import com.quiztech.categoryservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import static com.quiztech.categoryservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryApi implements CategoryController{
    private final CategoryService categoryService;
    private final WebClientGetter webClient;

    @Override
    public ResponseEntity<CategoryResponse> add(CategoryRequest request) {
        return ResponseEntity.ok(categoryService.add(request));
    }

    @Override
    public ResponseEntity<CategoryResponse> addQuizId(Map<String, String> patchRequest) {
        return ResponseEntity.ok(categoryService.addQuizId(patchRequest));
    }

    @Override
    public ResponseEntity<CategoryResponse> get(String id) {
        return ResponseEntity.ok(categoryService.get(id));
    }

    @Override
    public ResponseEntity<List<CategoryResponse>> all(int page, int size) {
        return ResponseEntity.ok(categoryService.all(page, size));
    }

    @Override
    public ResponseEntity<Boolean> delete(String id) {
        return ResponseEntity.ok(categoryService.delete(id));
    }

    @Override
    public ResponseEntity<List<Quiz>> getQuiz() {
        return ResponseEntity.ok( webClient.quizzesByCategory("fd309364-53da-47ac-8e1c-192261faf4d2"));
    }
}
