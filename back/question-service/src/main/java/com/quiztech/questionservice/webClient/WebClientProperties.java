package com.quiztech.questionservice.webClient;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@Validated
@Getter @Setter
@ConfigurationProperties(prefix = "other.service.url")
public class WebClientProperties {
    public String urlQuizGet;
    public String urlQuizAddFromQuestion;
}
