package com.quiztech.quizservice.controller;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;
import com.quiztech.quizservice.service.QuizService;
import com.quiztech.quizservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import static com.quiztech.quizservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuizApi implements QuizController{
    private final QuizService quizService;
    @Override
    public ResponseEntity<Response> add(QuizRequest request) {
        return ResponseEntity.ok(quizService.add(request));
    }

    @Override
    public ResponseEntity<Response> addQuestion(Map<String, String> questionRequest) {
        return ResponseEntity.ok(quizService.addQuestion(questionRequest));
    }

    @Override
    public ResponseEntity<Response> update(QuizRequest request) {
        return ResponseEntity.ok(quizService.update(request));
    }

    @Override
    public ResponseEntity<Response> get(String id) {
        return ResponseEntity.ok(quizService.get(id));
    }

    @Override
    public ResponseEntity<Response> getByCategory(String idCategory) {
        return ResponseEntity.ok(quizService.quizByCategory(idCategory));
    }

    @Override
    public ResponseEntity<Response> all(int page, int size) {
        return ResponseEntity.ok(quizService.all(page, size));
    }

    @Override
    public ResponseEntity<Response> getByKeywordTitle(String keyword) {
        return ResponseEntity.ok(quizService.getByKeyWordTitle(keyword));
    }

    @Override
    public ResponseEntity<Response> delete(String id) {
        return ResponseEntity.ok(quizService.delete(id));
    }

    @Override
    public ResponseEntity<Response> evaluateQuiz(Map<String, Map<String, Boolean>> evaluateQuiz) {
        return ResponseEntity.ok(quizService.evaluateQuiz(evaluateQuiz));
    }
}
