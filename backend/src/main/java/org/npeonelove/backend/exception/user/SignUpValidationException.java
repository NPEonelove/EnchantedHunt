package org.npeonelove.backend.exception.user;

public class SignUpValidationException extends RuntimeException {
    public SignUpValidationException(String message) {
        super(message);
    }
}
