package org.npeonelove.backend.model.vacancyEntity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.npeonelove.backend.model.vacancyEntity.vacancyEnum.CareerLevel;
import org.npeonelove.backend.model.vacancyEntity.vacancyEnum.EmploymentType;

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

    @Embedded
    private Salary salary;

    private String contactPerson;
    private String postedDate;
    private String closingDate;

    @OneToMany(mappedBy = "vacancy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Responsibility> responsibilities;

    @OneToMany(mappedBy = "vacancy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Requirement> requirements;

    @OneToMany(mappedBy = "vacancy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VacancySkill> skills;

    @OneToMany(mappedBy = "vacancy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Benefit> benefits;
}
