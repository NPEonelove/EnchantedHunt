package org.npeonelove.backend.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.npeonelove.backend.dto.resume.EmployeeRequestDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CareerGuideRequest {
    private EmployeeRequestDTO employeeRequest;
    private String message;
}