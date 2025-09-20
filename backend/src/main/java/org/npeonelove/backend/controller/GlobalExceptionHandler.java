package org.npeonelove.backend.controller;

import org.npeonelove.backend.exception.BadRequestException;
import org.npeonelove.backend.exception.ErrorResponse;
import org.npeonelove.backend.exception.InternalServerErrorException;
import org.npeonelove.backend.exception.resume.EmployeeNotFoundException;
import org.npeonelove.backend.exception.user.*;
import org.npeonelove.backend.exception.vacancy.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse(
                        HttpStatus.NOT_FOUND.value(),
                        "User not found exception",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleLoginAlreadyExists(EmailAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                new ErrorResponse(
                        HttpStatus.CONFLICT.value(),
                        "Email already exists",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }

    @ExceptionHandler(SignUpValidationException.class)
    public ResponseEntity<ErrorResponse> handleSignUpValidation(SignUpValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        "Sign up validation failed",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }

    @ExceptionHandler(SignInValidationException.class)
    public ResponseEntity<ErrorResponse> handleSignInValidation(SignInValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        "Sign in validation failed",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }

    @ExceptionHandler(RefreshTokenValidationException.class)
    public ResponseEntity<ErrorResponse> handleRefreshTokenValidation(RefreshTokenValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        "Refresh token validation failed",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(RefreshTokenValidationException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse(
                        HttpStatus.NOT_FOUND.value(),
                        "Data not found",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(RefreshTokenValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        "invalid request",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }

    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<ErrorResponse> handleInternal(RefreshTokenValidationException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "Server error",
                        ex.getMessage(),
                        LocalDateTime.now()
                )
        );
    }

}
