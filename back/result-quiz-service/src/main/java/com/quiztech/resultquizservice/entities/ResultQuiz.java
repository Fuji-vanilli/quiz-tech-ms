package com.quiztech.resultquizservice.entities;

import com.quiztech.resultquizservice.models.User;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Document(value = "resultQuiz")
public class ResultQuiz {
    private String id;
    private String quizId;
    private Date createdDate;
    private Date lastUpdateDate;
    private Double rate;
    private boolean active;
    private User user;
}
