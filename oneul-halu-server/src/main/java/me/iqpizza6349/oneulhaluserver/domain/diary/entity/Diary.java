package me.iqpizza6349.oneulhaluserver.domain.diary.entity;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Diary {

    private String diaryNo;
    private long authorId;
    private String title;
    private String content;
    private byte emoji;
    private LocalDate wroteDate;

}
