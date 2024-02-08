package com.quiztech.categoryservice.webClient;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Getter @Setter
@Configuration
@Validated
@ConfigurationProperties(prefix = "other.service.url")
public class WebClientUrlServiceProperties {
    public String quizUrlGet;
}
