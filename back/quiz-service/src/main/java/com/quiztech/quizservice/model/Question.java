package com.quiztech.quizservice.model;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class Question {
    private String content;
    private Date createdDate;
    private Date lastUpdateDate;
    private String image;
    private String answer;
    private String quizId;
    private List<String> options= new ArrayList<>();
}
