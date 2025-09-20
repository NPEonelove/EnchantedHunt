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
    private String comment;


    private List<RoleDTO> roles;
    private List<WorkExperienceDTO> workExperiences;
    private List<EducationDTO> educationList;
    private List<AdditionalEducationDTO> additionalEducationList;
    private List<SkillDTO> skills;
}
