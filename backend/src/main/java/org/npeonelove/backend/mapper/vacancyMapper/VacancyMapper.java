package org.npeonelove.backend.mapper.vacancyMapper;



import org.mapstruct.*;
import org.npeonelove.backend.dto.vacancy.VacancyRequestDTO;
import org.npeonelove.backend.dto.vacancy.VacancyResponseDTO;
import org.npeonelove.backend.model.vacancyEntity.Vacancy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                SalaryMapper.class,
                ResponsibilityMapper.class,
                RequirementMapper.class,
                VacancySkillMapper.class,
                BenefitMapper.class
        }
)
public interface VacancyMapper {

    @Mapping(target = "id", ignore = true)
    Vacancy toEntity(VacancyRequestDTO dto);

    VacancyResponseDTO toResponseDTO(Vacancy vacancy);

    List<VacancyResponseDTO> toResponseDTOList(List<Vacancy> vacancies);
}
