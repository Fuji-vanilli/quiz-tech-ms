package com.quiztech.categoryservice.dto;

import com.quiztech.categoryservice.models.Quiz;
import lombok.*;
import org.springframework.expression.spel.ast.QualifiedIdentifier;

import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CategoryResponse {
    private String id;
    private String title;
    private String description;
    private String icon;
    private String createdBy;
    private Date createdDate;
    private String image;
    private Date lastUpdateDate;
    private List<String> quizsId;
    private List<Quiz> quizzes;
}
