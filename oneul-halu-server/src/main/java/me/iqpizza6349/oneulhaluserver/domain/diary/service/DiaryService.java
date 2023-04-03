package me.iqpizza6349.oneulhaluserver.domain.diary.service;

import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.diary.dao.DiaryMapper;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryCreateRequest;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryModifyRequest;
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
        calendar.set(year, month - 1, 1);
        LocalDate end = LocalDate.of(year, month, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        return diaryMapper.findAll(member, start.toString(), end.toString());
    }

    public Diary diary(final Member member, final int year,
                               final int month, final int day) {
        if (month > 13) {
            throw new RuntimeException();
        }

        LocalDate start = LocalDate.of(year, month, day);
        return diaryMapper.findDiary(member, start.toString())
                .orElseThrow(Diary.DiaryNotFoundException::new);
    }

    public void saveDiary(final Member member, final DiaryCreateRequest createRequest) {
        diaryMapper.saveDiary(createRequest.toDomain(member));
    }

    public Diary findDiaryById(final String no) {
        return diaryMapper.findDiaryById(no)
                .orElseThrow(Diary.DiaryNotFoundException::new);
    }

    public void updateDiary(final Member member, final String no,
                            final DiaryModifyRequest modifyRequest) {
        if (diaryMapper.existsDiaryByAuthor(member, no)) {
            diaryMapper.updateDiary(no, modifyRequest);
            return;
        }
        throw new Diary.DiaryNotFoundException();
    }

    public void deleteDiary(final Member member, final String no) {
        if (diaryMapper.existsDiaryByAuthor(member, no)) {
            diaryMapper.deleteDiary(no);
            return;
        }

        throw new Diary.DiaryNotFoundException();
    }
}
