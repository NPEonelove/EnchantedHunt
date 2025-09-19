package org.npeonelove.backend.exception.user;

public class RefreshTokenValidationException extends RuntimeException {
    public RefreshTokenValidationException(String message) {
        super(message);
    }
}
