package com.quiztech.quizservice.model;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class Category {
    private String title;
    private String description;
    private String icon;
}
