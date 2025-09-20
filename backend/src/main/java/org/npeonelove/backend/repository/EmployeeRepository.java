package org.npeonelove.backend.repository;

import org.npeonelove.backend.model.resumeEntity.Employee;
import org.npeonelove.backend.model.vacancyEntity.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    @Query("SELECT v FROM Employee v WHERE v.id = :id")
    Optional<Employee> findByUUID(@Param("id") UUID id);
}

