package com.quiztech.resultquizservice.dto;

import com.quiztech.resultquizservice.models.Quiz;
import com.quiztech.resultquizservice.models.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResultQuizResponse {
    private String id;
    private String quizId;
    private Date createdDate;
    private Date lastUpdateDate;
    private Double rate;
    private boolean active;
    private String emailUser;
    private Quiz quiz;
}
