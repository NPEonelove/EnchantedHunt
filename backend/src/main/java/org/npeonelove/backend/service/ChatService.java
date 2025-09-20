package org.npeonelove.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.client.AiFeignClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final AiFeignClient aiFeignClient;
    private final ObjectMapper objectMapper;

    //возврат ответа на /test
    public String answerMessage(String message) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(aiFeignClient.test());
        return "{\"response\": \"" + "Отличный вопрос!" + " " + jsonNode.get("message").asText() +  "\"}";
    }

}
