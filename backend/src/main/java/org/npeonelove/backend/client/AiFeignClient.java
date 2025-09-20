package org.npeonelove.backend.client;

import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithVacancyRequestDTO;
import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithoutVacancyRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "aiService", url = "http://localhost:8000")
public interface AiFeignClient {

    @PostMapping("/process-message")
    String test(String message);

    @PostMapping("/generate-career-guide-without-vacancy")
    String generateCareerGuideWithoutVacancy(@RequestBody InitChatCareerGuideWithoutVacancyRequestDTO initChatCareerGuideWithoutVacancyRequestDTO);

    @PostMapping("/generate-career-guide-with-vacancy")
    String generateCareerGuideWithVacancy(@RequestBody InitChatCareerGuideWithVacancyRequestDTO initChatCareerGuideWithVacancyRequestDTO);

}
