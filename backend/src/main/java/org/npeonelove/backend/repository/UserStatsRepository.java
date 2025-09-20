package org.npeonelove.backend.repository;

import org.npeonelove.backend.model.achievement.UserStats;
import org.npeonelove.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserStatsRepository extends JpaRepository<UserStats, UUID> {

    // Находим UserStats по User
    Optional<UserStats> findByEmployeeId(UUID employeeId);

}