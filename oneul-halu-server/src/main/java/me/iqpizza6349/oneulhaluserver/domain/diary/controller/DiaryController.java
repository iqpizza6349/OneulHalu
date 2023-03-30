package me.iqpizza6349.oneulhaluserver.domain.diary.controller;

import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.diary.entity.Diary;
import me.iqpizza6349.oneulhaluserver.domain.diary.service.DiaryService;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import me.iqpizza6349.oneulhaluserver.global.annotations.AuthToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diary")
public class DiaryController {

    private final DiaryService diaryService;

    @AuthToken
    @GetMapping
    public List<Diary> diaries(@RequestAttribute Member member,
                               @RequestParam int year,
                               @RequestParam int month) {
        System.out.println(member.getId());
        return diaryService.diaries(member, year, month);
    }

}
