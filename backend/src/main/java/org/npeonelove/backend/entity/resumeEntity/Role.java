package org.npeonelove.backend.entity.resumeEntity;

import jakarta.persistence.*;
import org.npeonelove.backend.entity.resumeEntity.resumeEnum.RoleType;

import java.util.UUID;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", length = 255, nullable = false)
    private RoleType roleType;

    @Column(name = "title", length = 255)
    private String title;

    @Column(name = "responsibilities", columnDefinition = "TEXT")
    private String responsibilities;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

