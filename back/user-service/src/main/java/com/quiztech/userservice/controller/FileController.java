package com.quiztech.userservice.controller;

import com.quiztech.userservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileController {
    ResponseEntity<Response> uploadProfilePhoto(MultipartFile file);
}
