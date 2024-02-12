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
    private BigDecimal marks;
    private String description;
    private BigDecimal numberOfQuestions;
    private List<String> questionsId;
    private boolean active;
    private String categoryId;
}
