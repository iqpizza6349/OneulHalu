package me.iqpizza6349.oneulhaluserver.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.global.properties.JwtProperties;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtils {

    private static final String IDENT_ACCESS = "ACCESS";
    private static final String IDENT_REFRESH = "REFRESH";
    private final JwtProperties jwtProperties;
    private final SignatureAlgorithm algorithm = SignatureAlgorithm.HS256;

    public String generateAccessToken(long id) {
        return generateToken(IDENT_ACCESS, id, jwtProperties.getExpirationSecond());
    }

    public String generateRefreshToken(long id) {
        return generateToken(IDENT_REFRESH, id,
                jwtProperties.getExpirationSecond() * 168);
    }

    private String generateToken(String type, long id, long expSecond) {
        final Date tokenCreationDate = new Date();

        return Jwts.builder()
                .claim("type", type)
                .setSubject(String.valueOf(id))
                .setIssuedAt(tokenCreationDate)
                .setExpiration(new Date(tokenCreationDate.getTime() + expSecond))
                .signWith(generateKey(type), algorithm)
                .compact();
    }

    public Claims validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(Base64.decodeBase64(jwtProperties.getSecret()))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            throw new JwtException(e.getMessage());
        }
    }

    public String extractLoginFromToken(String token) {
        return validateToken(token).getSubject();
    }

    public String getTokenFromHeader(String headerValue) {
        if (headerValue != null && headerValue.startsWith("Bearer ")) {
            return headerValue.replace("Bearer ", "");
        }

        return null;
    }

    public long getExpirationTime() {
        return jwtProperties.getExpirationSecond();
    }

    private Key generateKey(String type) {
        String secretKey;
        if (type.equals(IDENT_ACCESS)) {
            secretKey = jwtProperties.getSecret();
        }
        else {
            secretKey = jwtProperties.getRefreshSecret();
        }

        byte[] apiKeySecret = Base64.decodeBase64(secretKey);
        return new SecretKeySpec(apiKeySecret, algorithm.getJcaName());
    }
}
