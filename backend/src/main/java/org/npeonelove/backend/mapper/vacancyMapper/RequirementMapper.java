package org.npeonelove.backend.mapper.vacancyMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.vacancy.RequirementDTO;
import org.npeonelove.backend.model.vacancyEntity.Requirement;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RequirementMapper {
    Requirement toEntity(RequirementDTO dto);
    RequirementDTO toDTO(Requirement entity);

    List<Requirement> toEntityList(List<RequirementDTO> dtos);
    List<RequirementDTO> toDTOList(List<Requirement> entities);
}