package org.npeonelove.backend.model.resumeEntity;

import jakarta.persistence.*;
import lombok.Data;
import org.npeonelove.backend.model.achievement.UserStats;

import java.util.*;

@Entity
@Table(name = "employees")
@Data
public class Employee {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @OneToOne(mappedBy = "employee", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private UserStats userStats;

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

    // поля, которые раньше были коллекциями -> теперь TEXT (с JSON внутри, например)
    @Column(name = "roles", columnDefinition = "TEXT")
    private String roles; // JSON array or any string representation

    @Column(name = "work_experience", columnDefinition = "TEXT")
    private String workExperience;

    @Column(name = "education", columnDefinition = "TEXT")
    private String education;

    @Column(name = "additional_education", columnDefinition = "TEXT")
    private String additionalEducation;

    @Column(name = "skills", columnDefinition = "TEXT")
    private String skills;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

}
