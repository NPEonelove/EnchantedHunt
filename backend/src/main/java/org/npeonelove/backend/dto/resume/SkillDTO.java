package org.npeonelove.backend.dto.resume;


import lombok.*;
import org.npeonelove.backend.model.resumeEntity.resumeEnum.SkillLevel;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillDTO {
    private String skillName;
    private SkillLevel level;
}
