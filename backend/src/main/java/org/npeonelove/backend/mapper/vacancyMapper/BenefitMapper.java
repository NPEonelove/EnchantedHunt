package org.npeonelove.backend.mapper.vacancyMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.vacancy.BenefitDTO;
import org.npeonelove.backend.model.vacancyEntity.Benefit;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BenefitMapper {
    Benefit toEntity(BenefitDTO dto);
    BenefitDTO toDTO(Benefit entity);

    List<Benefit> toEntityList(List<BenefitDTO> dtos);
    List<BenefitDTO> toDTOList(List<Benefit> entities);
}
