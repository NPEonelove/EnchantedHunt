package org.npeonelove.backend.controller;

import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.client.AiFeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final AiFeignClient aiFeignClient;

    @GetMapping("/test")
    public String test() {
        return aiFeignClient.test();
    }

}
