package org.npeonelove.backend.repository;

import org.npeonelove.backend.model.vacancyEntity.Vacancy;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface VacancyRepository extends JpaRepository<Vacancy, UUID> {
    @Query("SELECT v FROM Vacancy v WHERE v.id = :id")
    Optional<Vacancy> findByUUID(@Param("id") UUID id);
}