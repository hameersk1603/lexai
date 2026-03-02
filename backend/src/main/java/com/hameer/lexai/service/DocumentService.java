package com.hameer.lexai.service;

import com.hameer.lexai.model.Document;
import com.hameer.lexai.model.User;
import com.hameer.lexai.repository.DocumentRepository;
import com.hameer.lexai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    public Document saveDocument(Long userId, String fileName, String content, String aiAnalysis) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Document document = new Document();
        document.setUser(user);
        document.setFileName(fileName);
        document.setContent(content);
        document.setAiAnalysis(aiAnalysis);
        document.setUploadedAt(LocalDateTime.now());
        return documentRepository.save(document);
    }

    public List<Document> getDocumentsByUser(Long userId) {
        return documentRepository.findByUserId(userId);
    }

    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }

    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}