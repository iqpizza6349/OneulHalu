package me.iqpizza6349.oneulhaluserver.domain.diary.controller;

import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryCreateRequest;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryListResponse;
import me.iqpizza6349.oneulhaluserver.domain.diary.entity.Diary;
import me.iqpizza6349.oneulhaluserver.domain.diary.service.DiaryService;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import me.iqpizza6349.oneulhaluserver.global.annotations.AuthToken;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diary")
public class DiaryController {

    private final DiaryService diaryService;

    @AuthToken
    @GetMapping
    public DiaryListResponse diaries(@RequestAttribute Member member,
                               @RequestParam int year,
                               @RequestParam int month) {
        System.out.println(member.getId());
        return new DiaryListResponse(diaryService.diaries(member, year, month));
    }

    @GetMapping("/{no}")
    public Diary findDiary(@PathVariable String no) {
        return diaryService.findDiaryById(no);
    }

    @AuthToken
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createDiary(@RequestAttribute Member member,
                            @RequestBody DiaryCreateRequest request) {
        diaryService.saveDiary(member, request);
    }

    @AuthToken
    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDiary(@RequestAttribute Member member,
                            @RequestParam String no) {
        diaryService.deleteDiary(no);
    }
}
