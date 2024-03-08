package com.quiztech.userservice.mapper;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.dto.UserResponse;
import com.quiztech.userservice.entities.User;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserMapperImpl implements  UserMapper{
    @Override
    public User mapToUser(UserRequest request) {
        return User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .username(request.getUsername())
                .photo(request.getPhoto())
                .email(request.getEmail())
                .biography(request.getBiography())
                .organisations(request.getOrganisations())
                .competences(request.getCompetences())
                .description(request.getDescription())
                .build();
    }

    @Override
    public UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .createdDate(user.getCreatedDate())
                .lastUpdateDate(user.getLastUpdateDate())
                .username(user.getUsername())
                .photo(user.getPhoto())
                .biography(user.getBiography())
                .competences(user.getCompetences())
                .description(user.getDescription())
                .organisations(user.getOrganisations())
                .subscribers(user.getSubscribers())
                .subscribes(user.getSubscribes())
                .numberOfSubscribers(user.getNumberOfSubscribers())
                .numberOfSubscribes(user.getNumberOfSubscribes())
                .linkNetwork(user.getLinkNetwork())
                .build();
    }
}
