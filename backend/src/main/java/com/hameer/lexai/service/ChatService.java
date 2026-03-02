package com.hameer.lexai.service;

import com.hameer.lexai.model.ChatMessage;
import com.hameer.lexai.model.User;
import com.hameer.lexai.repository.ChatMessageRepository;
import com.hameer.lexai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private UserRepository userRepository;

    public ChatMessage saveMessage(Long userId, String userMessage, String aiResponse) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        ChatMessage message = new ChatMessage();
        message.setUser(user);
        message.setUserMessage(userMessage);
        message.setAiResponse(aiResponse);
        message.setCreatedAt(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getChatHistory(Long userId) {
        return chatMessageRepository.findByUserIdOrderByCreatedAtAsc(userId);
    }

    public void clearHistory(Long userId) {
        List<ChatMessage> messages = chatMessageRepository.findByUserIdOrderByCreatedAtAsc(userId);
        chatMessageRepository.deleteAll(messages);
    }
}