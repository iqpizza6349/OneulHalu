package me.iqpizza6349.oneulhaluserver.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.swcns.reflectivecipher.annotation.SecurityField;

@Getter
@AllArgsConstructor @NoArgsConstructor
public class MemberRegisterRequest {

    @SecurityField
    private String email;

    @SecurityField
    private String username;

    @SecurityField
    private String password;

}
