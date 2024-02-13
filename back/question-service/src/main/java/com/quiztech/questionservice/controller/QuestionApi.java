package com.quiztech.questionservice.controller;

import com.quiztech.questionservice.dto.QuestionRequest;
import com.quiztech.questionservice.dto.QuestionResponse;
import com.quiztech.questionservice.services.QuestionService;
import com.quiztech.questionservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.quiztech.questionservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuestionApi implements QuestionController {
    private final QuestionService questionService;
    @Override
    public ResponseEntity<Response> add(QuestionRequest request) {
        return ResponseEntity.ok(questionService.add(request));
    }

    @Override
    public ResponseEntity<Response> get(String id) {
        return ResponseEntity.ok(questionService.get(id));
    }

    @Override
    public ResponseEntity<Response> allByQuiz(String quizId) {
        return ResponseEntity.ok(questionService.allByQuizId(quizId));
    }

    @Override
    public ResponseEntity<Response> all(int page, int size) {
        return ResponseEntity.ok(questionService.all(page, size));
    }

    @Override
    public ResponseEntity<Response> delete(String id) {
        return ResponseEntity.ok(questionService.delete(id));
    }
}
