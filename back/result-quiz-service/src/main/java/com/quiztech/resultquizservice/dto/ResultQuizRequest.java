package com.quiztech.resultquizservice.dto;

import com.quiztech.resultquizservice.models.User;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ResultQuizRequest {
    private String id;
    private String quizId;
    private Double rate;
    private String emailUser;
}
