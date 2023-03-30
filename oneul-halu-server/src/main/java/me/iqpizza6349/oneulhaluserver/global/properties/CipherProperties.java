package me.iqpizza6349.oneulhaluserver.global.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "cipher")
public class CipherProperties {
    private String algorithm;
    private String key;
    private String hash;
    private String iv;
}
