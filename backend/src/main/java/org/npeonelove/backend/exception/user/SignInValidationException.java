package org.npeonelove.backend.exception.user;

public class SignInValidationException extends RuntimeException {
    public SignInValidationException(String message) {
        super(message);
    }
}
