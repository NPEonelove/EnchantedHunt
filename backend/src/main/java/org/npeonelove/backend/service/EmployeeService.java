package org.npeonelove.backend.service;


import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.resume.EmployeeRequestDTO;
import org.npeonelove.backend.dto.resume.EmployeeResponseDTO;
import org.npeonelove.backend.exception.resume.EmployeeNotFoundException;
import org.npeonelove.backend.exception.vacancy.ResourceNotFoundException;
import org.npeonelove.backend.mapper.resumeMapper.EmployeeMapper;
import org.npeonelove.backend.model.resumeEntity.Employee;
import org.npeonelove.backend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor

public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    // CREATE
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO request) {
        Employee Employee = employeeMapper.toEntity(request);
        Employee saved = employeeRepository.save(Employee);
        return employeeMapper.toResponseDto(saved);
    }

    // READ
    public EmployeeResponseDTO getEmployee(UUID id) {
        Employee Employee = employeeRepository.findByUUID(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found: " + id));
        return employeeMapper.toResponseDto(Employee);
    }

    // UPDATE
    public EmployeeResponseDTO updateEmployee(UUID id, EmployeeRequestDTO request) {
        Employee Employee = employeeRepository.findByUUID(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found: " + id));

        // Обновим поля вручную (MapStruct не делает merge по умолчанию)
        Employee.setFullName(request.getFullName());
        Employee.setDepartment(request.getDepartment());
        Employee.setPosition(request.getPosition());
        Employee.setGrade(request.getGrade());
        Employee.setExperienceInCompany(request.getExperienceInCompany());

        Employee updated = employeeRepository.save(Employee);
        return employeeMapper.toResponseDto(updated);
    }

    // DELETE
    public void deleteEmployee(UUID id) {
        Employee existing = employeeRepository.findByUUID(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found: " + id));
        employeeRepository.delete(existing);
    }

    // LIST
    public List<EmployeeResponseDTO> listEmployees() {
        return employeeMapper.toResponseDtoList(employeeRepository.findAll());
    }
}
