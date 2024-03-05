package com.quiztech.resultquizservice.controller;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;
import com.quiztech.resultquizservice.service.ResultQuizService;
import com.quiztech.resultquizservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

import static com.quiztech.resultquizservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class ResultQuizApi implements ResultQuizController{
    private final ResultQuizService resultQuizService;
    @Override
    public ResponseEntity<Response> add(ResultQuizRequest request) {
        return ResponseEntity.ok(resultQuizService.add(request));
    }

    @Override
    public ResponseEntity<Response> get(String id) {
        return ResponseEntity.ok(resultQuizService.get(id));
    }

    @Override
    public ResponseEntity<Response> getByEmailUser(String emailUser) {
        return ResponseEntity.ok(resultQuizService.getByUserEmail(emailUser));
    }

    @Override
    public ResponseEntity<Response> all() {
        return ResponseEntity.ok(resultQuizService.all());
    }

    @Override
    public ResponseEntity<Response> update(Map<String, Object> rate) {
        return ResponseEntity.ok(resultQuizService.updateRate(rate));
    }

    @Override
    public ResponseEntity<Response> delete(String quizId, String emailUser, BigDecimal frequency) {
        return ResponseEntity.ok(resultQuizService.delete(quizId, emailUser, frequency));
    }

    @Override
    public ResponseEntity<Response> getResultQuizSummary() {
        return null;
    }
}
