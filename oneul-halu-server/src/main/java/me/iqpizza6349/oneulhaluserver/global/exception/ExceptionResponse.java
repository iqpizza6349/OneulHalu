package me.iqpizza6349.oneulhaluserver.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ExceptionResponse {
    private final HttpStatus status;
    private final String message;

    public ExceptionResponse(BusinessException e) {
        this.status = e.getStatus();
        this.message = e.getMessage();
    }
}
