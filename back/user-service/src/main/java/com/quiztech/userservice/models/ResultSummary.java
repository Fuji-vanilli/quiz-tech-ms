package com.quiztech.userservice.models;

import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ResultSummary {
    private String quizTitle;
    private List<Double> rates;
}
