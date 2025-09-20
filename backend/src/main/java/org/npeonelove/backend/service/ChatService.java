package org.npeonelove.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.client.AiFeignClient;
import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithVacancyRequestDTO;
import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithoutVacancyRequestDTO;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final AiFeignClient aiFeignClient;
    private final ObjectMapper objectMapper;

    //возврат ответа на /test
    public String answerMessage(String message) {
//        JsonNode jsonNode = objectMapper.readTree(aiFeignClient.test(message));
//        return getMessageText(jsonNode);
        return aiFeignClient.test(message);
    }

    // получение карьерной консультации по резюме (без вакансии)
    public String generateCareerGuideWithoutVacancy(InitChatCareerGuideWithoutVacancyRequestDTO initChatCareerGuideWithoutVacancyRequestDTO) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(
                aiFeignClient.generateCareerGuideWithoutVacancy(initChatCareerGuideWithoutVacancyRequestDTO));
        return getMessageText(jsonNode);
    }

    // получение карьерной консультации по резюме (с вакансией)
    public String generateCareerGuideWithVacancy(InitChatCareerGuideWithVacancyRequestDTO initChatCareerGuideWithVacancyRequestDTO) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(
                aiFeignClient.generateCareerGuideWithVacancy(initChatCareerGuideWithVacancyRequestDTO));
        return getMessageText(jsonNode);
    }

    // получение текста из message от ai service
    private String getMessageText(JsonNode jsonNode) {
        return "{\"response\": \"" + jsonNode.get("message").asText() +  "\"}";
    }

}
