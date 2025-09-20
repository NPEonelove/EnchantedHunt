package org.npeonelove.backend.mapper.resumeMapper;


import org.mapstruct.*;
import org.npeonelove.backend.dto.resume.EmployeeRequestDTO;
import org.npeonelove.backend.dto.resume.EmployeeResponseDTO;
import org.npeonelove.backend.model.resumeEntity.Employee;

import java.util.List;

@Mapper(componentModel = "spring", uses = {
        RoleMapper.class,
        WorkExperienceMapper.class,
        EducationMapper.class,
        AdditionalEducationMapper.class,
        EmployeeSkillMapper.class,
})
public interface EmployeeMapper {

    Employee toEntity(EmployeeRequestDTO dto);

    EmployeeResponseDTO toResponseDto(Employee entity);

    List<EmployeeResponseDTO> toResponseDtoList(List<Employee> entities);
}
