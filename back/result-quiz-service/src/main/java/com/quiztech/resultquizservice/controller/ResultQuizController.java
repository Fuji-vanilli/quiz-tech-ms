package com.quiztech.resultquizservice.controller;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;
import com.quiztech.resultquizservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

public interface ResultQuizController {
    @PostMapping("add")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> add(@RequestBody ResultQuizRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<Response> get(@PathVariable String id);
    @GetMapping("getByEmailUser/{emailUser}")
    ResponseEntity<Response> getByEmailUser(@PathVariable String emailUser);
    @GetMapping("all")
    ResponseEntity<Response> all();
    @PatchMapping("update")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> update(@RequestBody Map<String, Object> rate);
    @DeleteMapping("delete/{quizId}/{emailUser}/{frequency}")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> delete(
            @PathVariable String quizId,
            @PathVariable String emailUser,
            @PathVariable BigDecimal frequency
    );

    /* traitement of result*/

    @GetMapping("resultSummary/{emailUser}")
    ResponseEntity<Response> getResultQuizSummary(@PathVariable String emailUser);

}
