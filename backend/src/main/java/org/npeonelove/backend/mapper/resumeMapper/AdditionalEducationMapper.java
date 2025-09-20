package org.npeonelove.backend.mapper.resumeMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.resume.AdditionalEducationDTO;
import org.npeonelove.backend.model.resumeEntity.AdditionalEducation;

@Mapper(componentModel = "spring")
public interface AdditionalEducationMapper {
    AdditionalEducation toEntity(AdditionalEducationDTO dto);
    AdditionalEducationDTO toDto(AdditionalEducation entity);
}
