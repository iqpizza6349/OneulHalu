package me.iqpizza6349.oneulhaluserver.domain.member.entity;

import lombok.*;
import me.iqpizza6349.oneulhaluserver.global.exception.BusinessException;
import org.springframework.http.HttpStatus;
import org.swcns.reflectivecipher.annotation.SecurityField;

@Data
@Builder
@ToString
@AllArgsConstructor @NoArgsConstructor
public class Member {

    private long id;

    @SecurityField
    private String name;

    @SecurityField
    private String password;

    public static class MemberNotFoundException extends BusinessException {
        public MemberNotFoundException() {
            super(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다.");
        }
    }

    public static class MemberUnauthorizedException extends BusinessException {
        public MemberUnauthorizedException() {
            super(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다.");
        }
    }
}
