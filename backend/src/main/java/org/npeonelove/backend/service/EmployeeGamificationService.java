package org.npeonelove.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.model.achievement.UserStats;
import org.npeonelove.backend.model.resumeEntity.Employee;
import org.npeonelove.backend.repository.UserStatsRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeGamificationService {

    private final UserStatsRepository userStatsRepository;

    @Transactional
    public void addExperience(Employee employee, int xp) {
        // Получаем UserStats
        UserStats stats = userStatsRepository.findByEmployeeId(employee.getId())
                .orElseThrow(() -> new RuntimeException("UserStats not found"));

        // Начисляем опыт
        stats.setXpCount(stats.getXpCount() + xp);

        // Простейшая проверка ачивок
        if (stats.getXpCount() >= 300 && !stats.getTrailblazer()) {
            stats.setTrailblazer(true);
        }
        if (stats.getXpCount() >= 700 && !stats.getFullGear()) {
            stats.setFullGear(true);
        }
        if (stats.getXpCount() >= 1000 && !stats.getConnoisseur()) {
            stats.setConnoisseur(true);
        }
        if (stats.getXpCount() >= 2000 && !stats.getILiveHere()) {
            stats.setILiveHere(true);
        }
        if (stats.getXpCount() >= 3000 && !stats.getPlatformStar()) {
            stats.setPlatformStar(true);
        }

        // Сохраняем изменения
        userStatsRepository.save(stats);
    }
}