package com.quiztech.categoryservice.service;


import com.quiztech.categoryservice.entities.Category;
import com.quiztech.categoryservice.repository.CategoryRepository;
import com.quiztech.categoryservice.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileServiceImpl implements FileService {
    private final CategoryRepository categoryRepository;
    @Value("${image.storage.local.directory}")
    private String localDirectory;
    @Override
    public Response uploadImage(MultipartFile file, String id) {
        Category category = categoryRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("error to fetch category into the database")
        );

        String originalFilename = file.getOriginalFilename();
        String filenameExtension = StringUtils.getFilenameExtension(originalFilename);

        String newFileName= "IMG_"+ UUID.randomUUID().toString()+"."+filenameExtension;

        Path pathFile = Paths.get(localDirectory, newFileName);
        category.setImage("../../../../assets"+newFileName);

        categoryRepository.save(category);

        try {
            file.transferTo(pathFile.toFile());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return Response.builder()
                .status(HttpStatus.OK)
                .statusCode(HttpStatus.OK.value())
                .data(Map.of(
                        "path", pathFile
                ))
                .message("image uploaded successfully")
                .build();
    }
}
