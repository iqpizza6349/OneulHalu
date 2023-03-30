package me.iqpizza6349.oneulhaluserver.domain.member.controller;

import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.member.dto.MemberLoginResponse;
import me.iqpizza6349.oneulhaluserver.domain.member.dto.MemberRequest;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import me.iqpizza6349.oneulhaluserver.domain.member.service.MemberService;
import me.iqpizza6349.oneulhaluserver.global.annotations.AuthToken;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.swcns.reflectivecipher.annotation.DecryptReturns;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody final MemberRequest request) {
        memberService.register(request);
    }

    @PostMapping("/login")
    public MemberLoginResponse login(@RequestBody final MemberRequest request) {
        return memberService.login(request);
    }

    @AuthToken
    @GetMapping
    @DecryptReturns
    public Member getInfo(@RequestAttribute Member member) {
        return member;
    }
}
