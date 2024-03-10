package com.quiztech.quizservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class QuizRequest {
    private String id;
    private String title;
    private String difficulty;
    private BigDecimal marks;
    private String imageUrl;
    private String description;
    private String createdBy;
    private BigDecimal numberOfQuestions;
    private BigDecimal duration;
    private List<String> questionsId;
    private boolean active;
    private String categoryId;
}
