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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
        user.setRoles(extractRoles());
        user.setPhoto("../../../../assets/default_user.jpg");

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("{id}")
                .buildAndExpand("api/user/get/" + user.getId())
                .toUri();

        userRepository.save(user);
        log.info("user added successfully! - roles: {}", extractRoles());

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
    public Response toSubscribe(Map<String, String> email) {
        String emailToSubscribe= email.get("emailToSubscribe");
        String emailSubscriber= email.get("emailSubscriber");

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
        User userSubscriber= userOptional2.get();

        if (userToSubscribe.getSubscribers().contains(emailSubscriber)) {
            log.error("Sorry! the user is already subscribe on this account");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "Sorry! the user is already subscribe on this account"
            );
        }

        userToSubscribe.getSubscribers().add(emailSubscriber);
        userSubscriber.getSubscribes().add(emailToSubscribe);

        BigDecimal addToSubscribers = userToSubscribe.getNumberOfSubscribers().add(new BigDecimal(1));
        BigDecimal addToSubscribes = userSubscriber.getNumberOfSubscribes().add(new BigDecimal(1));

        userToSubscribe.setNumberOfSubscribers(addToSubscribers);
        userSubscriber.setNumberOfSubscribes(addToSubscribes);

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

    @Override
    public Response unsubscribe(Map<String, String> email) {
        String emailToSubscribe= email.get("emailToSubscribe");
        String emailSubscriber= email.get("emailSubscriber");

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
        User userSubscriber= userOptional2.get();

        if (!userToSubscribe.getSubscribers().contains(emailSubscriber)) {
            log.error("Sorry! the user doesn't subscribe on this account");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "Sorry! the user doesn't subscribe on this account"
            );
        }

        userToSubscribe.getSubscribers().remove(emailSubscriber);
        userSubscriber.getSubscribes().remove(emailToSubscribe);

        BigDecimal addToSubscribers = userToSubscribe.getNumberOfSubscribers().subtract(new BigDecimal(1));
        BigDecimal addToSubscribes = userSubscriber.getNumberOfSubscribes().subtract(new BigDecimal(1));

        userToSubscribe.setNumberOfSubscribers(addToSubscribers);
        userSubscriber.setNumberOfSubscribes(addToSubscribes);

        userRepository.save(userSubscriber);
        userRepository.save(userToSubscribe);

        log.info("user: {} unsubscribe to : {}", userSubscriber.getEmail(), userToSubscribe.getEmail());

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "userSubscriber", userMapper.mapToUserResponse(userSubscriber),
                        "userToSubscribe", userMapper.mapToUserResponse(userToSubscribe)
                ),
                "User: "+userSubscriber.getEmail()+" unsubscribe to: "+userToSubscribe
        );
    }

    @Override
    public Response addRoles(Map<String, String> roles) {
        String emailUser= roles.get("email");
        String role= roles.get("role");

        Optional<User> userOptional = userRepository.findByEmail(emailUser);
        if (userOptional.isEmpty()) {
            log.error("user with the email: {} doesn't exist!", emailUser);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "user with the email: " + emailUser + " doesn't exist!"
            );
        }

        User user= userOptional.get();
        user.getRoles().add(role);

        userRepository.save(user);
        log.info("role added successfully to : {}", emailUser);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "user", userMapper.mapToUserResponse(user)
                ),
                "role added successfully to: "+emailUser
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

    private Set<String> extractRoles() {
        Set<String> roles= new HashSet<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof Jwt jwt) {

            extractRoles(jwt).forEach(token-> roles.add(token.getAuthority()));
        }

        return roles;
    }

    private Collection<? extends GrantedAuthority> extractRoles(Jwt jwt) {
        Map<String, Object> resourceId= jwt.getClaim("resource_id");
        Map<String, Object> resource;
        Collection<String> resourceRoles;

        if (Objects.isNull(resourceId)
                || Objects.isNull(resource= (Map<String, Object>) resourceId.get("front-quiz"))
                || Objects.isNull(resourceRoles= (Collection<String>) resource.get("roles"))) {

            return Set.of();
        }

        return resourceRoles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }
}
