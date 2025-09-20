package org.npeonelove.backend.model.vacancyEntity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.npeonelove.backend.model.vacancyEntity.vacancyEnum.CareerLevel;
import org.npeonelove.backend.model.vacancyEntity.vacancyEnum.EmploymentType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vacancies")
public class Vacancy {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String title;
    private String department;
    private String location;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private CareerLevel careerLevel;


    private Integer salary;

    private String contactPerson;
    private Date postedDate;
    private Date closingDate;

    // 👇 теперь все списки заменены на одну строку
    @Column(columnDefinition = "TEXT")
    private String responsibilities;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String benefits;
}
