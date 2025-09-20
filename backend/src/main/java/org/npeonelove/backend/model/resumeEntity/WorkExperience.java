package org.npeonelove.backend.model.resumeEntity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "work_experience")
@Data
public class WorkExperience {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "company_name", length = 255)
    private String companyName;

    @Column(name = "role", length = 255)
    private String role;

    private LocalDate startDate;
    private LocalDate endDate;

    @Column(name = "responsibilities", columnDefinition = "TEXT")
    private String responsibilities;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

