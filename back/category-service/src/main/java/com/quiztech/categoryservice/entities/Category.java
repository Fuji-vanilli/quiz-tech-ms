package com.quiztech.categoryservice.entities;

import com.quiztech.categoryservice.models.Quiz;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Document(value = "category")
public class Category {
    @Id
    private String id;
    private String title;
    private String description;
    private String icon;
    private Date createdDate;
    private Date lastUpdateDate;
    private List<String> quizsId= new ArrayList<>();
    private List<Quiz> quizzes= new ArrayList<>();

}
