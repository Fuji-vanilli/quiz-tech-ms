package com.quiztech.questionservice.entities;

import com.quiztech.questionservice.model.Quiz;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Document(value = "question")
public class Question {
    private String id;
    private String content;
    private Date createdDte;
    private Date lastUpdateDate;
    private String image;
    private String quizId;
    private List<String> options= new ArrayList<>();
    private Quiz quiz;
}
