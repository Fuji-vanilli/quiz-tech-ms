package com.quiztech.userservice.controller;

import com.quiztech.userservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface FileController {
    @PatchMapping("add-image-profile")
    ResponseEntity<Response> uploadProfilePhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("emailUser") String emailUser
    );
}
