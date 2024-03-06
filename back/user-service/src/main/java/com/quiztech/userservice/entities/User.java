package com.quiztech.userservice.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Document(value = "user")
public class User {
    @Id
    private String id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private Date createdDate;
    private Date lastUpdateDate;
    private String photo;
    private List<String> competences= new ArrayList<>();
    private List<String> organisations= new ArrayList<>();
    private String biography;
    private String description;
    private BigDecimal followers;
    private BigDecimal following;
    private List<String> linkNetwork= new ArrayList<>();
}
