package com.hameer.lexai.controller;

import com.hameer.lexai.model.LegalCase;
import com.hameer.lexai.service.LegalCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = "*")
public class LegalCaseController {

    @Autowired
    private LegalCaseService legalCaseService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createCase(@PathVariable Long userId, @RequestBody LegalCase legalCase) {
        try {
            return ResponseEntity.ok(legalCaseService.createCase(userId, legalCase));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LegalCase>> getCasesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(legalCaseService.getCasesByUser(userId));
    }

    @GetMapping("/lawyer/{lawyerId}")
    public ResponseEntity<List<LegalCase>> getCasesByLawyer(@PathVariable Long lawyerId) {
        return ResponseEntity.ok(legalCaseService.getCasesByLawyer(lawyerId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<LegalCase>> getAllCases() {
        return ResponseEntity.ok(legalCaseService.getAllCases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCaseById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(legalCaseService.getCaseById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/summary/{id}")
    public ResponseEntity<?> updateSummary(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            return ResponseEntity.ok(legalCaseService.updateAiSummary(id, body.get("summary")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCase(@PathVariable Long id) {
        legalCaseService.deleteCase(id);
        return ResponseEntity.ok(Map.of("message", "Case deleted"));
    }
}