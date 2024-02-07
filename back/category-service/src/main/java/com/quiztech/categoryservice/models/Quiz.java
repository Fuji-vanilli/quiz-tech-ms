package com.quiztech.categoryservice.models;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class Quiz {
    private String id;
    private String title;
    private String description;
    private BigDecimal marks;
    private BigDecimal numberOfQuestions;
    private List<String> questionsId;
    private boolean active;
}
