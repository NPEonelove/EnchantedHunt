package org.npeonelove.backend.model.resumeEntity;

import jakarta.persistence.*;
import lombok.Data;
import org.npeonelove.backend.model.resumeEntity.resumeEnum.SkillLevel;

import java.util.UUID;

@Entity
@Table(name = "skillsEmployee")
@Data
public class EmployeeSkill {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "skill", length = 255)
    private String skillName;

    @Enumerated(EnumType.STRING)
    @Column(name = "level", length = 255, nullable = false)
    private SkillLevel level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

