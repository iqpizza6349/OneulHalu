package me.iqpizza6349.oneulhaluserver.global.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties("jwt")
public class JwtProperties {

    private String secret;
    private String refreshSecret;
    private long expirationSecond;

}
