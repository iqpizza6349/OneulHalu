package me.iqpizza6349.oneulhaluserver.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.iqpizza6349.oneulhaluserver.domain.member.dao.MemberMapper;
import me.iqpizza6349.oneulhaluserver.domain.member.dto.MemberLoginResponse;
import me.iqpizza6349.oneulhaluserver.domain.member.dto.MemberLoginRequest;
import me.iqpizza6349.oneulhaluserver.domain.member.dto.MemberRegisterRequest;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import me.iqpizza6349.oneulhaluserver.global.util.JwtUtils;
import org.springframework.stereotype.Service;
import org.swcns.reflectivecipher.annotation.EncryptParams;
import org.swcns.reflectivecipher.annotation.SecurityParam;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final JwtUtils jwtUtils;

    @EncryptParams
    public void register(@SecurityParam final MemberRegisterRequest registerRequest) {
        Member member = Member.builder()
                .email(registerRequest.getEmail())
                .name(registerRequest.getUsername())
                .password(registerRequest.getPassword())
                .build();
        memberMapper.saveMember(member);
    }

    @EncryptParams
    public MemberLoginResponse login(@SecurityParam final MemberLoginRequest request) {
        Member member = memberMapper.findMemberByEmail(request.getEmail())
                .orElseThrow(Member.MemberNotFoundException::new);
        if (!(member.getPassword()).equals(request.getPassword())) {
            throw new Member.MemberUnauthorizedException();
        }

        final long memberId = member.getId();
        return new MemberLoginResponse(jwtUtils.generateAccessToken(memberId),
                jwtUtils.generateRefreshToken(memberId), jwtUtils.getExpirationTime());
    }
}
