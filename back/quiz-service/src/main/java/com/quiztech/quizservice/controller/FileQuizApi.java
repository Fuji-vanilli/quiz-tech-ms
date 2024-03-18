package com.quiztech.quizservice.controller;

import com.quiztech.quizservice.service.FileService;
import com.quiztech.quizservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static com.quiztech.quizservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
public class FileQuizApi implements FileQuizController{
    private final FileService fileService;
    @Override
    public ResponseEntity<Response> updatePhotoQuiz(MultipartFile file, String quizId) {
        return ResponseEntity.ok(fileService.uploadQuizPhoto(file, quizId));
    }
}
