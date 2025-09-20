package org.npeonelove.backend.mapper.vacancyMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.vacancy.ResponsibilityDTO;
import org.npeonelove.backend.model.vacancyEntity.Responsibility;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResponsibilityMapper {
    Responsibility toEntity(ResponsibilityDTO dto);
    ResponsibilityDTO toDTO(Responsibility entity);

    List<Responsibility> toEntityList(List<ResponsibilityDTO> dtos);
    List<ResponsibilityDTO> toDTOList(List<Responsibility> entities);
}