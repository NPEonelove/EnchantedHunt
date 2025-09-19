package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.npeonelove.backend.dto.jwt.GetJwtUserClaimsResponseDTO;
import org.npeonelove.backend.exception.user.UserNotFoundException;
import org.npeonelove.backend.model.user.User;
import org.npeonelove.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    // получение айди и роли для генерации jwt токенов
    public GetJwtUserClaimsResponseDTO getJwtUserClaims(UUID userId) {
        return modelMapper.map(getUserByUUID(userId), GetJwtUserClaimsResponseDTO.class);
    }

    // получение юзера по UUID
    public User getUserByUUID(UUID userId) {
        return userRepository.findUserByUserId(userId).orElseThrow(
                () -> new UserNotFoundException("User with id " + userId.toString() + " not found"));
    }
}
