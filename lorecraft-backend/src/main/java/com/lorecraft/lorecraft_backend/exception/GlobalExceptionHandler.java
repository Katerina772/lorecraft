package com.lorecraft.lorecraft_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Обробка помилок валідації @Valid.
     *
     * Наприклад:
     * title = ""
     * genreId = null
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleValidationException(
            MethodArgumentNotValidException exception
    ) {

        Map<String, String> errors = new LinkedHashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        return Map.of(
                "status", 400,
                "error", "Validation failed",
                "details", errors
        );
    }

    /**
     * Помилка неправильного типу параметра.
     *
     * Наприклад:
     * /api/quests/status/WRONG_STATUS
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleTypeMismatchException(
            MethodArgumentTypeMismatchException exception
    ) {

        return Map.of(
                "status", 400,
                "error", "Invalid parameter value",
                "message",
                "Invalid value for parameter: "
                        + exception.getName()
        );
    }

    /**
     * Помилка неправильного JSON або неправильного формату body.
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleMessageNotReadableException(
            HttpMessageNotReadableException exception
    ) {

        return Map.of(
                "status", 400,
                "error", "Invalid request body",
                "message", "Request body has invalid format"
        );
    }

    /**
     * Відсутній обов'язковий @RequestParam.
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleMissingParameterException(
            MissingServletRequestParameterException exception
    ) {

        return Map.of(
                "status", 400,
                "error", "Missing request parameter",
                "message",
                "Required parameter is missing: "
                        + exception.getParameterName()
        );
    }

    /**
     * Поточні Service використовують IllegalArgumentException
     * для різних типів помилок.
     *
     * Тому тут розрізняємо:
     *
     * "not found" / "not found with id" -> 404
     * "already exists" / "already taken" / "already registered" -> 409
     * інші IllegalArgumentException -> 400
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public org.springframework.http.ResponseEntity<Map<String, Object>>
    handleIllegalArgumentException(
            IllegalArgumentException exception
    ) {

        String message = exception.getMessage() != null
                ? exception.getMessage()
                : "Invalid request";

        String lowerCaseMessage = message.toLowerCase();

        HttpStatus status;

        if (lowerCaseMessage.contains("not found")) {

            status = HttpStatus.NOT_FOUND;

        } else if (
                lowerCaseMessage.contains("already exists")
                        || lowerCaseMessage.contains("already taken")
                        || lowerCaseMessage.contains("already registered")
        ) {

            status = HttpStatus.CONFLICT;

        } else {

            status = HttpStatus.BAD_REQUEST;
        }

        Map<String, Object> body = new LinkedHashMap<>();

        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);

        return org.springframework.http.ResponseEntity
                .status(status)
                .body(body);
    }

    /**
     * Запасний обробник неочікуваних помилок.
     *
     * Не розкриваємо stack trace або внутрішні деталі БД клієнту.
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleGeneralException(
            Exception exception
    ) {

        return Map.of(
                "status", 500,
                "error", "Internal Server Error",
                "message", "An unexpected error occurred"
        );
    }
}