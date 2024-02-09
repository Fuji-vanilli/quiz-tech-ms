package com.quiztech.questionservice.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Quiz {
    private String id;
    private String title;
    private String description;
    private BigDecimal marks;
    private BigDecimal numberOfQuestions;
}
