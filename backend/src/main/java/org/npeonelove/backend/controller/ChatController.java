package org.npeonelove.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.chat.CareerGuideRequest;
import org.npeonelove.backend.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public String generateCareerGuideWithoutVacancy(@RequestBody CareerGuideRequest careerGuideRequest) throws JsonProcessingException {
        return chatService.generateCareerGuideWithoutVacancy(careerGuideRequest);
    }
}
