package me.iqpizza6349.oneulhaluserver.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor @NoArgsConstructor
public class DiaryModifyRequest {

    private String content;

    private int emoji;

}
