package com.quiztech.categoryservice.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CategoryRequest {
    private String title;
    private String description;
}
