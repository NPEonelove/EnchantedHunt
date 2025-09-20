package org.npeonelove.backend.mapper.resumeMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.resume.WorkExperienceDTO;
import org.npeonelove.backend.model.resumeEntity.WorkExperience;

@Mapper(componentModel = "spring")
public interface WorkExperienceMapper {
    WorkExperience toEntity(WorkExperienceDTO dto);
    WorkExperienceDTO toDto(WorkExperience entity);
}

