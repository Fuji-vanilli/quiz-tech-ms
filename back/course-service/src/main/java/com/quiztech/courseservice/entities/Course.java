package com.quiztech.courseservice.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Document("course")
public class Course {
    @Id
    private String id;
    private String title;
    private String description;
    private Date createdDate;
    private Date lastUpdateDate;
}
