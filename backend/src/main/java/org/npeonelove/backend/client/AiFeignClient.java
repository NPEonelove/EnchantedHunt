package org.npeonelove.backend.client;

import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithVacancyRequestDTO;
import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithoutVacancyRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "aiService", url = "http://localhost:8000")
public interface AiFeignClient {

    @GetMapping("/")
    String test();

    @PostMapping("/generate-career-guide-without-vacancy")
    String generateCareerGuideWithoutVacancy(@RequestBody InitChatCareerGuideWithoutVacancyRequestDTO initChatCareerGuideWithoutVacancyRequestDTO);

    @PostMapping("/generate-career-guide-with-vacancy")
    String generateCareerGuideWithVacancy(@RequestBody InitChatCareerGuideWithVacancyRequestDTO initChatCareerGuideWithVacancyRequestDTO);

}
