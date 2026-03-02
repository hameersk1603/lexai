package com.hameer.lexai.controller;

import com.hameer.lexai.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/save")
    public ResponseEntity<?> saveMessage(@RequestBody Map<String, Object> body) {
        try {
            Long userId = Long.valueOf(body.get("userId").toString());
            String userMessage = body.get("userMessage").toString();
            String aiResponse = body.get("aiResponse").toString();
            return ResponseEntity.ok(chatService.saveMessage(userId, userMessage, aiResponse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(chatService.getChatHistory(userId));
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> clearHistory(@PathVariable Long userId) {
        chatService.clearHistory(userId);
        return ResponseEntity.ok(Map.of("message", "Chat history cleared"));
    }
}
