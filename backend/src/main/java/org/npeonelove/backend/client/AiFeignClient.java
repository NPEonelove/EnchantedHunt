package org.npeonelove.backend.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "aiService", url = "http://localhost:8000")
public interface AiFeignClient {

    @GetMapping("/test")
    String test();

}
