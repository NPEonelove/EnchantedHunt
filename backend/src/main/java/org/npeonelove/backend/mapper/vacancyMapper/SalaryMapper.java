package org.npeonelove.backend.mapper.vacancyMapper;



import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.vacancy.SalaryDTO;
import org.npeonelove.backend.model.vacancyEntity.Salary;

@Mapper(componentModel = "spring")
public interface SalaryMapper {
    Salary toEntity(SalaryDTO dto);
    SalaryDTO toDTO(Salary entity);
}