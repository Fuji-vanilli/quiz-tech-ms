package com.quiztech.userservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class UserResponse {
    private String id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String photo;
    private List<String> competences= new ArrayList<>();
    private List<String> organisations= new ArrayList<>();
    private String biography;
    private String description;
    private BigDecimal followers;
    private BigDecimal following;
    private List<String> linkNetwork= new ArrayList<>();
}
