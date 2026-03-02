package com.hameer.lexai.controller;

import com.hameer.lexai.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");
        String reply = geminiService.getResponse(prompt);
        return Map.of("reply", reply);
    }
}