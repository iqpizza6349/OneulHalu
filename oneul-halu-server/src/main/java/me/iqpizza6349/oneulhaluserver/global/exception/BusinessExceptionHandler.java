package me.iqpizza6349.oneulhaluserver.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class BusinessExceptionHandler {

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<String> undefinedException(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }

    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<ExceptionResponse> businessLogicException(BusinessException e) {
        return ResponseEntity.status(e.getStatus())
                .body(new ExceptionResponse(e));
    }
}
