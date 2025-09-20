package org.npeonelove.backend.mapper.resumeMapper;




import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.resume.EmployeeRequestDTO;
import org.npeonelove.backend.dto.resume.EmployeeResponseDTO;
import org.npeonelove.backend.model.resumeEntity.Employee;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    Employee toEntity(EmployeeRequestDTO dto);
    EmployeeResponseDTO toDto(Employee entity);
    List<EmployeeResponseDTO> toDtoList(List<Employee> entities);
}
