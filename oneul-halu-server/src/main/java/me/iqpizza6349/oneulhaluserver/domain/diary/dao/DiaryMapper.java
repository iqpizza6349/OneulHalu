package me.iqpizza6349.oneulhaluserver.domain.diary.dao;

import me.iqpizza6349.oneulhaluserver.domain.diary.entity.Diary;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface DiaryMapper {

    void saveDiary(Diary diary);

    List<Diary> findAll(@Param("member") Member member, @Param("start") String start,
                        @Param("end") String end);

    Optional<Diary> findDiary(Member member, int year, int month, int date);

}
