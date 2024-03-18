package com.quiztech.quizservice.service;

import com.quiztech.quizservice.utils.Response;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    Response uploadQuizPhoto(MultipartFile file, String quizId);
}
