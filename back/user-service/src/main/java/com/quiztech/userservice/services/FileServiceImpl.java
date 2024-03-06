package com.quiztech.userservice.services;

import com.quiztech.userservice.entities.User;
import com.quiztech.userservice.repositories.UserRepository;
import com.quiztech.userservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
public class FileServiceImpl implements FileService {

    private final UserRepository userRepository;
    @Value("${image.storage.local.directory}")
    private String localDirectory;
    @Override
    public Response uploadProfileImage(MultipartFile file, String emailUser) {
        User user = userRepository.findByEmail(emailUser).orElseThrow(
                () -> new IllegalArgumentException("user with the email: " + emailUser + " doesn't exist!")
        );

        String originalFilename = file.getOriginalFilename();

        String filenameExtension = StringUtils.getFilenameExtension(originalFilename);

        String newFileName= "IMG_"+ UUID.randomUUID().toString()+"."+filenameExtension;
        Path pathFile= Paths.get(localDirectory, newFileName);

        String pathLocation= localDirectory+"\\"+newFileName;
        user.setPhoto(pathLocation);

        try {
            file.transferTo(pathFile.toFile());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        userRepository.save(user);
        return Response.builder()
                .status(HttpStatus.OK)
                .data(Map.of(
                        "location", pathLocation
                ))
                .message("new profile image added!")
                .build();
    }
}
