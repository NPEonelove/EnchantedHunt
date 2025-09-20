package org.npeonelove.backend.repository;

import org.npeonelove.backend.model.vacancyEntity.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VacancyRepository extends JpaRepository<Vacancy, UUID> {
}