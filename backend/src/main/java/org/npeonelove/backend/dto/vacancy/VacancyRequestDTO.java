package org.npeonelove.backend.dto.vacancy;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacancyRequestDTO {
    private String title;
    private String department;
    private String location;
    private String employmentType;
    private String description;
    private String careerLevel;
    private SalaryDTO salary;
    private String contactPerson;
    private String postedDate;
    private String closingDate;

    private List<ResponsibilityDTO> responsibilities;
    private List<RequirementDTO> requirements;
    private List<VacancySkillDTO> skills;
    private List<BenefitDTO> benefits;

}
