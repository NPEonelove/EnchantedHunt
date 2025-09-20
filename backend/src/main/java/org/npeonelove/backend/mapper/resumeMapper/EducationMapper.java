package org.npeonelove.backend.mapper.resumeMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.resume.EducationDTO;
import org.npeonelove.backend.model.resumeEntity.Education;

@Mapper(componentModel = "spring")
public interface EducationMapper {
    Education toEntity(EducationDTO dto);
    EducationDTO toDto(Education entity);
}

