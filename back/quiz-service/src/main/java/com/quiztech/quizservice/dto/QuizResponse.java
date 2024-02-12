package com.quiztech.quizservice.dto;

import com.quiztech.quizservice.model.Category;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class QuizResponse {
    private String id;
    private String title;
    private String description;
    private Date createdDate;
    private Date lastUpdateDate;
    private BigDecimal marks;
    private BigDecimal numberOfQuestions;
    private List<String> questionsId;
    private boolean active;
    private String categoryId;
    private Category category;
}
