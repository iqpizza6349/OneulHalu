package me.iqpizza6349.oneulhaluserver.domain.member.dao;

import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MemberMapper {

    void saveMember(Member member);

    Optional<Member> findMemberById(long id);

    Optional<Member> findMemberByUsername(String username);

}
