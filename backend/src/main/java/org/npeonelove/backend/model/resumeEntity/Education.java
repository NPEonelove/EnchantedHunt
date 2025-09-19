package org.npeonelove.backend.model.resumeEntity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "institution", length = 255)
    private String institution;

    @Column(name = "degree", length = 255)
    private String degree;

    @Column(name = "specialization", length = 255)
    private String specialization;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
