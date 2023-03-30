package me.iqpizza6349.oneulhaluserver.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.iqpizza6349.oneulhaluserver.domain.diary.entity.Diary;
import me.iqpizza6349.oneulhaluserver.domain.member.entity.Member;
import me.iqpizza6349.oneulhaluserver.global.util.DiaryNoGenerator;

import java.time.LocalDate;

@Getter
@AllArgsConstructor @NoArgsConstructor
public class DiaryCreateRequest {

    private String content;

    @JsonProperty("wrote_at")
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate wroteAt;

    private int emoji;

    public Diary toDomain(Member member) {
        return toDomain(member.getId());
    }

    public Diary toDomain(long authorId) {
        return Diary.builder()
                .diaryNo(DiaryNoGenerator.generate())
                .authorId(authorId)
                .content(content)
                .emoji((byte) emoji)
                .wroteDate(wroteAt)
                .build();
    }
}
