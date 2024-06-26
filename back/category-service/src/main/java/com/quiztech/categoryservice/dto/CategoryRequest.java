package com.quiztech.categoryservice.dto;

import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CategoryRequest {
    private String id;
    private String title;
    private String description;
    private String createdBy;
    private String icon;
    private List<String> quizsId;
}
