package com.quiztech.categoryservice.controller;


import com.quiztech.categoryservice.service.FileService;
import com.quiztech.categoryservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static com.quiztech.categoryservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class FileApi implements FileController {
    private final FileService fileService;
    @Override
    public ResponseEntity<Response> uploadImage(MultipartFile file, String categoryId) {
        return ResponseEntity.ok(fileService.uploadImage(file, categoryId));
    }
}
