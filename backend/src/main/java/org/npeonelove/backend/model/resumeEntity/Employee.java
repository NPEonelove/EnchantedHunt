package org.npeonelove.backend.model.resumeEntity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Entity
@Table(name = "employees")
@Data
public class Employee {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "full_name", length = 255, nullable = false)
    private String fullName;

    @Column(name = "department", length = 255)
    private String department;

    @Column(name = "position", length = 255)
    private String position;

    @Column(name = "grade")
    private Integer grade;

    @Column(name = "experience_in_company")
    private Integer experienceInCompany; // в месяцах

    @Column(name = "user_comment")
    private String comment;


    // Связи
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkExperience> workExperiences = new ArrayList<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educationList = new ArrayList<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdditionalEducation> additionalEducationList = new ArrayList<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmployeeSkill> skills = new ArrayList<>();

}
