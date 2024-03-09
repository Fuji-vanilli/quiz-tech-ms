package com.quiztech.userservice.entities;

import com.quiztech.userservice.models.ResultSummary;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.*;

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
    private Set<String> roles= new HashSet<>();
    private Date createdDate;
    private Date lastUpdateDate;
    private String photo;
    private List<String> competences= new ArrayList<>();
    private List<String> organisations= new ArrayList<>();
    private String biography;
    private String description;
    private BigDecimal numberOfSubscribers= new BigDecimal(0);
    private BigDecimal numberOfSubscribes= new BigDecimal(0);
    private List<String> linkNetwork= new ArrayList<>();
    private List<String> subscribers= new ArrayList<>();
    private List<String> subscribes= new ArrayList<>();
    private List<ResultSummary> resultSummaries= new ArrayList<>();
}
