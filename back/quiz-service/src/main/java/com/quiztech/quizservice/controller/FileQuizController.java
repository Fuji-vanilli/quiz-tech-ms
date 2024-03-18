package com.quiztech.quizservice.controller;

import com.quiztech.quizservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface FileQuizController {
    @PatchMapping("update-image")
    ResponseEntity<Response> updatePhotoQuiz(
            @RequestParam("file") MultipartFile file,
            @RequestParam("quizId") String quizId
    );
}
