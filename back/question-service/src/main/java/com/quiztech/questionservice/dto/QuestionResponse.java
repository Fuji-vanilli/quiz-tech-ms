package com.quiztech.questionservice.dto;

import com.quiztech.questionservice.model.Quiz;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionResponse {
    private String id;
    private String content;
    private Date createdDte;
    private Date lastUpdateDate;
    private String image;
    private String quizId;
    private List<String> options= new ArrayList<>();
    private Quiz quiz;
}
