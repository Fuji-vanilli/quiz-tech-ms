package com.quiztech.courseservice.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseResponse {
    private String id;
    private String title;
    private String description;
    private Date createdDate;
    private Date lastUpdateDate;
}
