package org.npeonelove.backend.dto.resume;


import lombok.*;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequestDTO {
    private String fullName;
    private String department;
    private String position;
    private Integer grade;
    private Integer experienceInCompany; // в месяцах
    private String roles;
    private String  workExperiences;
    private String educationList;
    private String additionalEducationList;
    private String skills;
    private String comment;
}
