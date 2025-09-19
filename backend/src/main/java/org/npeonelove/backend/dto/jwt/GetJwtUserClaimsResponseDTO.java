package org.npeonelove.backend.dto.jwt;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.npeonelove.backend.model.user.UserRoleEnum;

import java.util.UUID;

@Getter
@Setter
public class GetJwtUserClaimsResponseDTO {

    private UUID userId;
    private UserRoleEnum role;

}