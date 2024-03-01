package com.quiztech.resultquizservice.controller;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;
import com.quiztech.resultquizservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

public interface ResultQuizController {
    @PostMapping("add")
    ResponseEntity<Response> add(@RequestBody ResultQuizRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<Response> get(@PathVariable String id);
    @GetMapping("all")
    ResponseEntity<Response> all();
    @PatchMapping("update")
    ResponseEntity<Response> update(@RequestBody Map<String, Object> rate);
    @DeleteMapping("delete/{id}")
    ResponseEntity<Response> delete(@PathVariable String id);

}
