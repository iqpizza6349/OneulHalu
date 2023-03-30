package me.iqpizza6349.oneulhaluserver.domain.diary.service;

import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.diary.dao.DiaryMapper;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryCreateRequest;
import me.iqpizza6349.oneulhaluserver.domain.diary.entity.Diary;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryMapper diaryMapper;

    public List<Diary> diaries(final Member member, final int year,
                               final int month) {
        if (month > 13) {
            throw new RuntimeException();
        }

        LocalDate start = LocalDate.of(year, month, 1);
        Calendar calendar = Calendar.getInstance();
        //noinspection MagicConstant
        calendar.set(year, month + 1, 1);
        LocalDate end = LocalDate.of(year, month, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        System.out.println(start);
        System.out.println(end);
        return diaryMapper.findAll(member, start.toString(), end.toString());
    }

    public void saveDiary(final Member member, final DiaryCreateRequest createRequest) {
        diaryMapper.saveDiary(createRequest.toDomain(member));
    }

    public Diary findDiaryById(final String no) {
        return diaryMapper.findDiary(no)
                .orElseThrow(Diary.DiaryNotFoundException::new);
    }

    public void deleteDiary(final String no) {
        diaryMapper.deleteDiary(no);
    }
}
