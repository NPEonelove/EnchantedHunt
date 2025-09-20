package org.npeonelove.backend.service;

import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.repository.AchievementRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;



}
