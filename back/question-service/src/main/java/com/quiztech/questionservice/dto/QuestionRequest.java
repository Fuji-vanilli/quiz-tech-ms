package com.quiztech.questionservice.dto;

import com.quiztech.questionservice.model.Quiz;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionRequest {
    private String id;
    private String content;
    private String image;
    private String answer;
    private String quizId;
    private List<String> options= new ArrayList<>();
}
