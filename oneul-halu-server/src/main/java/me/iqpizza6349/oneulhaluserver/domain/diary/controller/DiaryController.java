package me.iqpizza6349.oneulhaluserver.domain.diary.controller;

import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryCreateRequest;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryListResponse;
import me.iqpizza6349.oneulhaluserver.domain.diary.dto.DiaryModifyRequest;
import me.iqpizza6349.oneulhaluserver.domain.diary.entity.Diary;
import me.iqpizza6349.oneulhaluserver.domain.diary.service.DiaryService;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import me.iqpizza6349.oneulhaluserver.global.annotations.AuthToken;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    @AuthToken
    @GetMapping
    public DiaryListResponse diaries(@RequestAttribute Member member,
                               @RequestParam int year,
                               @RequestParam int month) {
        return new DiaryListResponse(diaryService.diaries(member, year, month));
    }

    @AuthToken
    @GetMapping("/diary")
    public Diary diary(@RequestAttribute Member member,
                       @RequestParam int year,
                       @RequestParam int month,
                       @RequestParam int day) {
        return diaryService.diary(member, year, month, day);
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
    @PatchMapping("/{no}")
    @CrossOrigin(origins = "*", methods = RequestMethod.PATCH)
    public void updateDiary(@RequestAttribute Member member,
                             @PathVariable String no,
                             @RequestBody DiaryModifyRequest modifyRequest) {
        diaryService.updateDiary(member, no, modifyRequest);
    }

    @AuthToken
    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @CrossOrigin(origins = "*", methods = RequestMethod.DELETE)
    public void deleteDiary(@RequestAttribute Member member,
                            @RequestParam String no) {
        diaryService.deleteDiary(member, no);
    }
}
