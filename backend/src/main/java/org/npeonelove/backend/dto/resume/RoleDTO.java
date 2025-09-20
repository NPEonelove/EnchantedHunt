package org.npeonelove.backend.dto.resume;

import lombok.*;
import org.npeonelove.backend.model.resumeEntity.resumeEnum.RoleType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleDTO {
    private RoleType roleType;
    private String title;
    private String responsibilities;
}
