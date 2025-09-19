package org.npeonelove.backend.dto.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JwtAuthenticationDTO {

    @NotBlank(message = "Access token cannot be blank")
    private String accessToken;

    @NotBlank(message = "Refresh token cannot be blank")
    private String refreshToken;
}