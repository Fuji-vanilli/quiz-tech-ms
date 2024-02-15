package com.quiztech.quizservice.entities;

import com.quiztech.quizservice.model.Category;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Document(value = "quiz")
public class Quiz {
    @Id
    private String id;
    private String title;
    private String description;
    private Date createdDate;
    private Date lastUpdateDate;
    private BigDecimal marks;
    private BigDecimal numberOfQuestions;
    private BigDecimal duration;
    private List<String> questionsId= new ArrayList<>();
    private boolean active;
    private String categoryId;
    private Category category;
}

