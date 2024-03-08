package com.quiztech.userservice.services;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.entities.User;
import com.quiztech.userservice.mapper.UserMapper;
import com.quiztech.userservice.models.ResultSummary;
import com.quiztech.userservice.repositories.UserRepository;
import com.quiztech.userservice.utils.Response;
import com.quiztech.userservice.validators.UserValidators;
import com.quiztech.userservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final WebClientGetter webClient;

    @Override
    public Response add(UserRequest request) {
        String email= request.getEmail();
        List<String> errors = UserValidators.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field required!");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    Map.of(
                            "errors", errors
                    ),
                    "some field required!!!!"
            );
        }

        if (userRepository.existsByEmail(email)) {
            log.error("user with the email : {} already exist on database", email);
            return generateResponse(
                    HttpStatus.OK,
                    null,
                    null,
                    "user with the email: "+email+" already exist on database!"
            );
        }

        User user = userMapper.mapToUser(request);
        user.setId(UUID.randomUUID().toString());
        user.setCreatedDate(new Date());
        user.setLastUpdateDate(new Date());
        user.setPhoto("../../../../assets/default_user.jpg");

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("{id}")
                .buildAndExpand("api/user/get/" + user.getId())
                .toUri();

        userRepository.save(user);
        log.info("user added successfully!");

        return generateResponse(
                HttpStatus.OK,
                location,
                Map.of(
                        "user", userMapper.mapToUserResponse(user)
                ),
                "user added successfully!"
        );
    }

    @Override
    public Response update(UserRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                ()-> new IllegalArgumentException("error to fetch user into the database!")
        );

        user.setBiography(request.getBiography());
        user.setDescription(request.getDescription());
        user.setCompetences(request.getCompetences());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setLastUpdateDate(new Date());

        userRepository.save(user);
        log.info("user with the id: {} updated successfully!", user.getId());

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "user", userMapper.mapToUserResponse(user)
                ),
                "user with the id: "+user.getId()+" updated successfully"
        );
    }

    @Override
    public Response get(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            log.error("user with the email: {} doesn't exist on the database!", email);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "user with the email: "+email+" doesn't exist on the database"
            );
        }

        User user= userOptional.get();

        log.info("user with the email: {} getted successfully!", email);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "user", userMapper.mapToUserResponse(user)
                ),
                "user with the email: "+email+" getted successfully!"
        );
    }

    @Override
    public Response all() {
        log.info("all user getted successfully!");
        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "users", userRepository.findAll().stream()
                                .map(userMapper::mapToUserResponse)
                                .toList()
                ),
                "all user getted successfully"
        );
    }

    @Override
    public Response delete(String email) {

        if (!userRepository.existsByEmail(email)) {
            log.error("user with the email: {} doesn't exist on the database!", email);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "user with the email: "+email+" doesn't exist on the database"
            );
        }

        userRepository.deleteByEmail(email);
        log.info("user with the email: {} deleted successfully", email);

        return generateResponse(
                HttpStatus.OK,
                null,
                null,
                "user with the email: "+email+" deleted successfully!"
        );
    }

    @Override
    public Response toSubscribe(String emailSubscriber, String emailToSubscribe) {
        Optional<User> userOptional1= userRepository.findByEmail(emailToSubscribe);
        Optional<User> userOptional2 = userRepository.findByEmail(emailSubscriber);
        if (userOptional1.isEmpty() || userOptional2.isEmpty()) {
            log.error("user with the email: {} doesn't exist!", emailToSubscribe);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "user with the email: " + emailToSubscribe + " doesn't exist!"
            );
        }

        User userToSubscribe= userOptional1.get();
        User userSubscriber= userOptional1.get();

        userToSubscribe.getSubscribers().add(emailSubscriber);
        userToSubscribe.getNumberOfSubscribers().add(new BigDecimal(1));

        userSubscriber.getNumberOfSubscribes().add(new BigDecimal(1));

        userRepository.save(userSubscriber);
        userRepository.save(userToSubscribe);

        log.info("user: {} subscribe to : {}", userSubscriber.getEmail(), userToSubscribe.getEmail());

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "userSubscriber", userMapper.mapToUserResponse(userSubscriber),
                        "userToSubscribe", userMapper.mapToUserResponse(userToSubscribe)
                ),
                "User: "+userSubscriber.getEmail()+" subscribe to: "+userToSubscribe
        );

    }


    private Response generateResponse(HttpStatus status, URI location, Map<?, ?> data, String message) {
        return Response.builder()
                .timeStamp(LocalDateTime.now())
                .status(status)
                .location(location)
                .statusCode(status.value())
                .data(data)
                .message(message)
                .build();
    }
}
