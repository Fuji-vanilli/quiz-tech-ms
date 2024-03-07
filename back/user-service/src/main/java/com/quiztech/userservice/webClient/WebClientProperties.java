package com.quiztech.userservice.webClient;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter @Setter
@ConfigurationProperties(prefix = "web.client.url")
public class WebClientProperties {
    private String resultQuiz;
}
