package me.iqpizza6349.oneulhaluserver.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public abstract class BusinessException extends RuntimeException {

    private final HttpStatus status;
    private final String message;

}
