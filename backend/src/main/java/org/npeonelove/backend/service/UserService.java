package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.npeonelove.backend.dto.jwt.JwtAuthenticationDTO;
import org.npeonelove.backend.dto.jwt.RefreshTokenDTO;
import org.npeonelove.backend.dto.user.UserCredentialsRequestDTO;
import org.npeonelove.backend.exception.user.EmailAlreadyExistsException;
import org.npeonelove.backend.exception.user.UserNotFoundException;
import org.npeonelove.backend.model.user.User;
import org.npeonelove.backend.model.user.UserRoleEnum;
import org.npeonelove.backend.repository.UserRepository;
import org.npeonelove.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    // регистрация пользователя
    @Transactional
    public JwtAuthenticationDTO signUp(UserCredentialsRequestDTO userCredentialsRequestDTO) {

        if (!isEmailUnique(userCredentialsRequestDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Login already exists");
        }

        User user = new User();

        user.setUserId(UUID.randomUUID());
        user.setEmail(userCredentialsRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userCredentialsRequestDTO.getPassword()));

        user.setRole(UserRoleEnum.USER);

        userRepository.save(user);

        return jwtService.generateAuthToken(user.getUserId());
    }

    // авторизация пользователя
    @Transactional
    public JwtAuthenticationDTO signIn(UserCredentialsRequestDTO userCredentialsRequestDTO) throws AuthenticationException {

        User user = userRepository.findUserByEmail((userCredentialsRequestDTO.getEmail()))
                .orElseThrow(() -> new UserNotFoundException("User with email " + userCredentialsRequestDTO.getEmail() + " not found"));

        if (!passwordEncoder.matches(userCredentialsRequestDTO.getPassword(), user.getPassword())) {
            throw new AuthenticationException("Invalid password");
        }

        return jwtService.generateAuthToken(user.getUserId());
    }

    // генерация access токена по refresh токену
    public JwtAuthenticationDTO refreshAccessToken(RefreshTokenDTO refreshTokenDTO) throws AuthenticationException {

        String refreshToken = refreshTokenDTO.getRefreshToken();

        if (refreshToken != null && jwtService.validateJwtToken(refreshToken)) {
            User user = authService.getUserByUUID(UUID.fromString(jwtService.getUserIdFromJwtToken(refreshToken)));
            return jwtService.refreshAccessToken(user.getUserId(), refreshToken);
        }

        throw new AuthenticationException("Invalid refresh token");
    }

    // проверка уникальности email
    private Boolean isEmailUnique(String email) {
        return !userRepository.existsUserByEmail(email);
    }

}
