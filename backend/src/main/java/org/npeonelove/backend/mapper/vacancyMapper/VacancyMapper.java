package org.npeonelove.backend.mapper.vacancyMapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.npeonelove.backend.dto.vacancy.VacancyRequestDTO;
import org.npeonelove.backend.dto.vacancy.VacancyResponseDTO;
import org.npeonelove.backend.model.vacancyEntity.Vacancy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VacancyMapper {

    @Mapping(target = "id", ignore = true) // id генерируется базой
    Vacancy toEntity(VacancyRequestDTO dto);

    VacancyResponseDTO toResponseDTO(Vacancy vacancy);

    List<VacancyResponseDTO> toResponseDTOList(List<Vacancy> vacancies);
}
