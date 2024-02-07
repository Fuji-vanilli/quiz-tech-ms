package com.quiztech.categoryservice.webClient;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@Validated
@ConfigurationProperties(prefix = "other.service.url")
public class WebClientUrlServiceProperties {
    public String quizUrlGet;
}
