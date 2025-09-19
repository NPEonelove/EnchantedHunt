package org.npeonelove.backend.model.resumeEntity;

import jakarta.persistence.*;
import org.npeonelove.backend.model.resumeEntity.resumeEnum.SkillLevel;

import java.util.UUID;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "skill_name", length = 255)
    private String skillName;

    @Enumerated(EnumType.STRING)
    @Column(name = "level", length = 255, nullable = false)
    private SkillLevel level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

