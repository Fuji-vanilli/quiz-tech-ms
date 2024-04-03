package com.quiztech.courseservice.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CourseRequest {
    private String id;
    private String title;
    private String description;
}
