package org.npeonelove.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.npeonelove.backend.dto.jwt.JwtAuthenticationDTO;
import org.npeonelove.backend.dto.jwt.RefreshTokenDTO;
import org.npeonelove.backend.dto.user.UserCredentialsRequestDTO;
import org.npeonelove.backend.exception.user.RefreshTokenValidationException;
import org.npeonelove.backend.exception.user.SignInValidationException;
import org.npeonelove.backend.exception.user.SignUpValidationException;
import org.npeonelove.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<JwtAuthenticationDTO> signUp(@RequestBody @Valid UserCredentialsRequestDTO userCredentialsRequestDTO,
                                                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new SignUpValidationException(validateBindingResult(bindingResult));
        }

        return ResponseEntity.ok(userService.signUp(userCredentialsRequestDTO));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<JwtAuthenticationDTO> signIn(@RequestBody @Valid UserCredentialsRequestDTO userCredentialsRequestDTO,
                                                       BindingResult bindingResult) throws AuthenticationException {
        if (bindingResult.hasErrors()) {
            throw new SignInValidationException(validateBindingResult(bindingResult));
        }

        return ResponseEntity.ok(userService.signIn(userCredentialsRequestDTO));
    }

    @PostMapping("/refresh-access-token")
    public ResponseEntity<JwtAuthenticationDTO> refreshAccessToken(@RequestBody @Valid RefreshTokenDTO refreshTokenDTO,
                                                                   BindingResult bindingResult) throws AuthenticationException {
        if (bindingResult.hasErrors()) {
            throw new RefreshTokenValidationException(validateBindingResult(bindingResult));
        }

        return ResponseEntity.ok(userService.refreshAccessToken(refreshTokenDTO));
    }

    // получение строки с ошибками валидации для исключений
    private String validateBindingResult(BindingResult bindingResult) {
        StringBuilder errors = new StringBuilder();
        for (FieldError error : bindingResult.getFieldErrors()) {
            errors.append(error.getDefaultMessage());
            errors.append(" ");
        }
        return errors.toString();
    }
}