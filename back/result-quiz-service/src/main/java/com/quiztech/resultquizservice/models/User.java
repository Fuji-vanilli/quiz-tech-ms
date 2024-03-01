package com.quiztech.resultquizservice.models;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class User {
    private String username;
    private String email;
}
