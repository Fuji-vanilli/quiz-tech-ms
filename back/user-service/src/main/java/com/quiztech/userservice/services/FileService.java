package com.quiztech.userservice.services;

import com.quiztech.userservice.utils.Response;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    Response uploadProfileImage(MultipartFile file);
}
