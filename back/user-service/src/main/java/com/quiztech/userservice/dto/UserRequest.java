package com.quiztech.userservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class UserRequest {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String photo;
    private String biography;
    private String description;
    private List<String> competences= new ArrayList<>();
    private List<String> organisations= new ArrayList<>();
}
