package com.quiztech.resultquizservice.models;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
 @Builder
public class Quiz {
    private String title;
    private String description;
}
