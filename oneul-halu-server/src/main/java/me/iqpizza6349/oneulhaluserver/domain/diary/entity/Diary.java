package me.iqpizza6349.oneulhaluserver.domain.diary.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.iqpizza6349.oneulhaluserver.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class Diary {

    private String diaryNo;
    private long authorId;
    private String content;
    private byte emoji;
    private LocalDate wroteDate;

    public static class DiaryNotFoundException extends BusinessException {
        public DiaryNotFoundException() {
            super(HttpStatus.NOT_FOUND, "일기가 존재하지 않습니다.");
        }
    }

}
