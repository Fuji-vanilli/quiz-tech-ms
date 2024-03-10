package com.quiztech.quizservice.dto;

import com.quiztech.quizservice.model.Category;
import com.quiztech.quizservice.model.Question;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class QuizResponse {
    private String id;
    private String title;
    private String description;
    private String difficulty;
    private Date createdDate;
    private String createdBy;
    private Date lastUpdateDate;
    private BigDecimal marks;
    private String imageUrl;
    private BigDecimal numberOfQuestions;
    private BigDecimal duration;
    private List<String> questionsId;
    private List<Question> questions= new ArrayList<Question>();
    private boolean active;
    private boolean status;
    private String categoryId;
    private Category category;
}
