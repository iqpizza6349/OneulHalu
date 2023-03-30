package me.iqpizza6349.oneulhaluserver.domain.diary.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.diary.entity.Diary;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class DiaryListResponse {

    private final List<Diary> data;

}
