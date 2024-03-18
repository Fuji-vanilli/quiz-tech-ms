package com.quiztech.quizservice.service;

import com.quiztech.quizservice.entities.Quiz;
import com.quiztech.quizservice.repository.QuizRepository;
import com.quiztech.quizservice.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{
    private final QuizRepository quizRepository;

    @Value("${image.storage.local.directory}")
    private String localDirectory;
    @Override
    public Response uploadQuizPhoto(MultipartFile file, String quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(
                () -> new IllegalArgumentException("error to fetch the quiz into the database!")
        );

        String originalFilename = file.getOriginalFilename();
        String filenameExtension = StringUtils.getFilenameExtension(originalFilename);

        String newFileName= "IMG_"+UUID.randomUUID().toString()+"."+filenameExtension;

        Path path = Paths.get(localDirectory, newFileName);
        String pathLocation= "../../../../assets/"+newFileName;
        quiz.setPhoto(pathLocation);

        try {
            file.transferTo(path.toFile());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        quizRepository.save(quiz);

        return Response.builder()
                .status(HttpStatus.OK)
                .data(Map.of(
                        "location", pathLocation
                ))
                .message("new photo image added for the quiz!")
                .build();
    }
}
