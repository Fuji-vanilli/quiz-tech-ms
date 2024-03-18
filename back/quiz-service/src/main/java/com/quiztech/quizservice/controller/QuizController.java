package com.quiztech.quizservice.controller;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;
import com.quiztech.quizservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface QuizController {
    @PostMapping("add")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> add(@RequestBody QuizRequest request);
    @PatchMapping("addQuestion")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> addQuestion(@RequestBody Map<String, String> questionRequest);
    @PutMapping("update")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> update(@RequestBody QuizRequest request);
    @PatchMapping("play/{id}")
    ResponseEntity<Response> playQuiz(@PathVariable String id);
    @GetMapping("get/{id}")
    ResponseEntity<Response> get(@PathVariable String id);
    @GetMapping("getByCategory/{idCategory}")
    ResponseEntity<Response> getByCategory(@PathVariable String idCategory);
    @GetMapping("all")
    ResponseEntity<Response> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    );
    @GetMapping("byTitleKeyword/{keyword}")
    ResponseEntity<Response> getByKeywordTitle(@PathVariable String keyword);
    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> delete(@PathVariable String id);
    @PatchMapping("evaluate")
    ResponseEntity<Response> evaluateQuiz(@RequestBody Map<String, Map<String, Boolean>> evaluateQuiz);


}
