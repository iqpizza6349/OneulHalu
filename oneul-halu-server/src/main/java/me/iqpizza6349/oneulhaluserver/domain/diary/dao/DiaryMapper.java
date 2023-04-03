package me.iqpizza6349.oneulhaluserver.domain.diary.dao;

import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryModifyRequest;
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

    Optional<Diary> findDiary(@Param("member") Member member, @Param("date") String date);

    Optional<Diary> findDiaryById(@Param("id") String id);

    void deleteDiary(String id);

    boolean existsDiaryByAuthor(@Param("member") Member member, @Param("no") String id);

    void updateDiary(@Param("no") String id, @Param("data") DiaryModifyRequest request);
}
