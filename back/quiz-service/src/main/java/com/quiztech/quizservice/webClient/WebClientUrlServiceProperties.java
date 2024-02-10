package com.quiztech.quizservice.webClient;

import com.mongodb.annotations.Sealed;
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
    private String categoryUrlGet;
    private String categoryUrlPatch;
}
