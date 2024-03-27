package com.quiztech.categoryservice.service;

import com.quiztech.categoryservice.utils.Response;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    Response uploadImage(MultipartFile file, String id);
}
