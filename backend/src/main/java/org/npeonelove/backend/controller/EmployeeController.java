package org.npeonelove.backend.controller;

import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.resume.EmployeeRequestDTO;
import org.npeonelove.backend.dto.resume.EmployeeResponseDTO;
import org.npeonelove.backend.mapper.resumeMapper.EmployeeMapper;
import org.npeonelove.backend.model.resumeEntity.Employee;
import org.npeonelove.backend.repository.EmployeeRepository;
import org.npeonelove.backend.service.EmployeeGamificationService;
import org.npeonelove.backend.service.EmployeeService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmployeeRepository employeeRepository;
    private final EmployeeGamificationService employeeGamificationService;

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> create(@RequestBody EmployeeRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.createEmployee(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> update(
            @PathVariable("id") UUID id,
            @RequestBody EmployeeRequestDTO request) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> list() {
        return ResponseEntity.ok(employeeService.listEmployees());
    }

    @PostMapping("/{id}/add-xp")
    public ResponseEntity<String> addExperience(
            @PathVariable UUID id,
            @RequestParam int xp
    ) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employeeGamificationService.addExperience(employee, xp);

        return ResponseEntity.ok("Added " + xp + " XP to employee " + employee.getFullName());
    }
}
