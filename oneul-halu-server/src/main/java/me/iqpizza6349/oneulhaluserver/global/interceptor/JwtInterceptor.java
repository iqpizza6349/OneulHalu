package me.iqpizza6349.oneulhaluserver.global.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.member.dao.MemberMapper;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import me.iqpizza6349.oneulhaluserver.global.annotations.AuthToken;
import me.iqpizza6349.oneulhaluserver.global.util.JwtUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtUtils jwtUtils;
    private final MemberMapper memberMapper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) {
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        if (!handlerMethod.getMethod().isAnnotationPresent(AuthToken.class)) {
            return true;
        }

        String header = jwtUtils.getTokenFromHeader(request.getHeader(HttpHeaders.AUTHORIZATION));
        String id = jwtUtils.extractLoginFromToken(header);
        if (id.equals("")) {
            request.setAttribute("member", null);
            return true;
        }

        Member member = memberMapper.findMemberById(Long.parseLong(id))
                .orElseThrow(Member.MemberNotFoundException::new);
        System.out.println(member);
        request.setAttribute("member", member);
        return true;
    }
}
