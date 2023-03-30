package me.iqpizza6349.oneulhaluserver.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.iqpizza6349.oneulhaluserver.domain.member.dao.MemberMapper;
import me.iqpizza6349.oneulhaluserver.domain.member.dto.MemberLoginResponse;
import me.iqpizza6349.oneulhaluserver.domain.member.dto.MemberRequest;
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
    public void register(@SecurityParam final MemberRequest registerRequest) {
        Member member = Member.builder()
                .name(registerRequest.getUsername())
                .password(registerRequest.getPassword())
                .build();
        memberMapper.saveMember(member);
    }

    @EncryptParams
    public MemberLoginResponse login(@SecurityParam final MemberRequest request) {
        Member member = memberMapper.findMemberByUsername(request.getUsername())
                .orElseThrow(Member.MemberNotFoundException::new);
        if (!(member.getPassword()).equals(request.getPassword())) {
            throw new Member.MemberUnauthorizedException();
        }

        final long memberId = member.getId();
        System.out.println(memberId);
        return new MemberLoginResponse(jwtUtils.generateAccessToken(memberId),
                jwtUtils.generateRefreshToken(memberId), jwtUtils.getExpirationTime());
    }
}
