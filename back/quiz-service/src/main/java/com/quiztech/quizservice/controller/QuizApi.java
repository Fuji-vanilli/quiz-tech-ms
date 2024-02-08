package com.quiztech.quizservice.controller;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

import static com.quiztech.quizservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuizApi implements QuizController{
    private final QuizService quizService;
    @Override
    public ResponseEntity<QuizResponse> add(QuizRequest request) {
        return ResponseEntity.ok(quizService.add(request));
    }

    @Override
    public ResponseEntity<QuizResponse> get(String id) {
        return ResponseEntity.ok(quizService.get(id));
    }

    @Override
    public ResponseEntity<List<QuizResponse>> getByCategory(String idCategory) {
        return ResponseEntity.ok(quizService.quizByCategory(idCategory));
    }

    @Override
    public ResponseEntity<Collection<QuizResponse>> all(int page, int size) {
        return ResponseEntity.ok(quizService.all(page, size));
    }

    @Override
    public ResponseEntity<Boolean> delete(String id) {
        return ResponseEntity.ok(quizService.delete(id));
    }
}
