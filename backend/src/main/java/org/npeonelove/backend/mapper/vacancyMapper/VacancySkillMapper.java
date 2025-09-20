package org.npeonelove.backend.mapper.vacancyMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.resume.SkillDTO;
import org.npeonelove.backend.model.vacancyEntity.VacancySkill;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VacancySkillMapper {
    VacancySkill toEntity(SkillDTO dto);
    SkillDTO toDTO(VacancySkill entity);

    List<VacancySkill> toEntityList(List<SkillDTO> dtos);
    List<SkillDTO> toDTOList(List<VacancySkill> entities);
}
