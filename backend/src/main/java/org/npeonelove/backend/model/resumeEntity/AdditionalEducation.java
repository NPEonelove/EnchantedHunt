package org.npeonelove.backend.model.resumeEntity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "additional_education")
public class AdditionalEducation {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "course_name", length = 255)
    private String courseName;

    @Column(name = "organization", length = 255)
    private String organization;

    private LocalDate issueDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
