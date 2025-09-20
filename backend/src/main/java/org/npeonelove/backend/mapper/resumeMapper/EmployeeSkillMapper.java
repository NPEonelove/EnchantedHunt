package org.npeonelove.backend.mapper.resumeMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.resume.SkillDTO;
import org.npeonelove.backend.model.resumeEntity.EmployeeSkill;

@Mapper(componentModel = "spring")
public interface EmployeeSkillMapper {
    EmployeeSkill toEntity(SkillDTO dto);
    SkillDTO toDto(EmployeeSkill entity);
}

