package com.quiztech.resultquizservice.webClient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@ConfigurationProperties(prefix = "other.service.url")
public class WebClientProperties {
    private String quizUrlGet;
}
