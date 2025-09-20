package org.npeonelove.backend.dto.vacancy;

import lombok.*;

import java.sql.Date;
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
    private Integer salary;
    private String contactPerson;
    private Date postedDate;
    private Date closingDate;

    private String responsibilities;
    private String requirements;
    private String skills;
    private String benefits;

}
