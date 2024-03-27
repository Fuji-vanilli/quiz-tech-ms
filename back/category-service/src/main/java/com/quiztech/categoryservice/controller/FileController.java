package com.quiztech.categoryservice.controller;

import com.quiztech.categoryservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface FileController {

    @PatchMapping("upload-image")
    ResponseEntity<Response> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("categoryId") String categoryId
    );

}
