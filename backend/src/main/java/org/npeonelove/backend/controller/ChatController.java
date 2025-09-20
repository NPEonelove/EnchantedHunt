package org.npeonelove.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithVacancyRequestDTO;
import org.npeonelove.backend.dto.chat.InitChatCareerGuideWithoutVacancyRequestDTO;
import org.npeonelove.backend.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin("http://localhost:3000")
@Controller
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ObjectMapper objectMapper;
//    private final Map<String, ChatSession> activeSessions = new ConcurrentHashMap<>();

    @MessageMapping("/chat.test")
    @SendTo("/topic/messages")
    public String generateCareerGuideWithoutVacancy(String message)  {
        System.out.println(message);
        return chatService.answerMessage(message);
    }

    @MessageMapping("/chat.without-vacancy")
    @SendTo("/topic/messages")
    public String generateCareerGuideWithoutVacancy(InitChatCareerGuideWithoutVacancyRequestDTO jsonMessageInitChatCareerGuideWithoutVacancyRequest) throws JsonProcessingException {
        return chatService.generateCareerGuideWithoutVacancy(jsonMessageInitChatCareerGuideWithoutVacancyRequest);
    }

    @MessageMapping("/chat.with-vacancy")
    @SendTo("/topic/messages")
    public String generateCareerGuideWithVacancy(@RequestBody InitChatCareerGuideWithVacancyRequestDTO initChatCareerGuideWithVacancyRequestDTO) throws JsonProcessingException {
        return chatService.generateCareerGuideWithVacancy(initChatCareerGuideWithVacancyRequestDTO);
    }
}
