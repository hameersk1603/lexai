package com.hameer.lexai.service;

import com.hameer.lexai.model.LegalCase;
import com.hameer.lexai.model.User;
import com.hameer.lexai.repository.LegalCaseRepository;
import com.hameer.lexai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LegalCaseService {

    @Autowired
    private LegalCaseRepository legalCaseRepository;

    @Autowired
    private UserRepository userRepository;

    public LegalCase createCase(Long userId, LegalCase legalCase) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        legalCase.setUser(user);
        legalCase.setCreatedAt(LocalDateTime.now());
        return legalCaseRepository.save(legalCase);
    }

    public List<LegalCase> getCasesByUser(Long userId) {
        return legalCaseRepository.findByUserId(userId);
    }

    public List<LegalCase> getCasesByLawyer(Long lawyerId) {
        return legalCaseRepository.findByLawyerId(lawyerId);
    }

    public LegalCase getCaseById(Long id) {
        return legalCaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Case not found"));
    }

    public LegalCase updateAiSummary(Long id, String summary) {
        LegalCase legalCase = getCaseById(id);
        legalCase.setAiSummary(summary);
        return legalCaseRepository.save(legalCase);
    }

    public List<LegalCase> getAllCases() {
        return legalCaseRepository.findAll();
    }

    public void deleteCase(Long id) {
        legalCaseRepository.deleteById(id);
    }
}