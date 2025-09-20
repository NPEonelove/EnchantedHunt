package org.npeonelove.backend.repository;

import org.npeonelove.backend.model.achievement.UserStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AchievementRepository extends JpaRepository<UserStats, UUID> {
}
