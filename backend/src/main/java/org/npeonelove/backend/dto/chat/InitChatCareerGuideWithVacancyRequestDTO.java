package org.npeonelove.backend.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.npeonelove.backend.dto.resume.EmployeeRequestDTO;
import org.npeonelove.backend.dto.vacancy.VacancyRequestDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InitChatCareerGuideWithVacancyRequestDTO {

    private EmployeeRequestDTO employeeRequest;
    private VacancyRequestDTO vacancyRequest;

    private String message;

}
