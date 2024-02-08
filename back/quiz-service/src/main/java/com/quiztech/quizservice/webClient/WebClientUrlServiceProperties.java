package com.quiztech.quizservice.webClient;

import com.mongodb.annotations.Sealed;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Getter @Sealed
@Configuration
@Validated
@ConfigurationProperties(prefix = "other.service.url")
public class WebClientUrlServiceProperties {
    private String categoryUrlPatch;
}
