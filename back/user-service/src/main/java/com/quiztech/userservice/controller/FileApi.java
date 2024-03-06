package com.quiztech.userservice.controller;

import com.quiztech.userservice.services.FileService;
import com.quiztech.userservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static com.quiztech.userservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
public class FileApi implements FileController{

    private final FileService fileService;
    @Override
    public ResponseEntity<Response> uploadProfilePhoto(MultipartFile file) {
        return ResponseEntity.ok(fileService.uploadProfileImage(file));
    }
}
