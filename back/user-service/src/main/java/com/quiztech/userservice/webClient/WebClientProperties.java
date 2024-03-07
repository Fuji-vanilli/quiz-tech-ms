package com.quiztech.userservice.webClient;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "web.client.url")
public class WebClientProperties {
    private String resultQuiz;
}
