package com.quiztech.categoryservice.entities;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
public class Category {
    private String id;
    private String title;
    private String description;
    private Date createdDate;
    private Date lastUpdateDate;
}
