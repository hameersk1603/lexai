package com.hameer.lexai.controller;

import com.hameer.lexai.enums.Specialty;
import com.hameer.lexai.model.Lawyer;
import com.hameer.lexai.service.LawyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lawyers")
@CrossOrigin(origins = "*")
public class LawyerController {

    @Autowired
    private LawyerService lawyerService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createProfile(@PathVariable Long userId, @RequestBody Lawyer lawyer) {
        try {
            return ResponseEntity.ok(lawyerService.createLawyerProfile(userId, lawyer));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Lawyer>> getAllLawyers() {
        return ResponseEntity.ok(lawyerService.getAllLawyers());
    }

    @GetMapping("/available")
    public ResponseEntity<List<Lawyer>> getAvailableLawyers() {
        return ResponseEntity.ok(lawyerService.getAvailableLawyers());
    }

    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<List<Lawyer>> getBySpecialty(@PathVariable Specialty specialty) {
        return ResponseEntity.ok(lawyerService.getLawyersBySpecialty(specialty));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Lawyer>> getByCity(@PathVariable String city) {
        return ResponseEntity.ok(lawyerService.getLawyersByCity(city));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Lawyer>> search(
            @RequestParam(required = false) Specialty specialty,
            @RequestParam(required = false) String city) {
        if (specialty != null && city != null) {
            return ResponseEntity.ok(lawyerService.getLawyersBySpecialtyAndCity(specialty, city));
        } else if (specialty != null) {
            return ResponseEntity.ok(lawyerService.getLawyersBySpecialty(specialty));
        } else if (city != null) {
            return ResponseEntity.ok(lawyerService.getLawyersByCity(city));
        }
        return ResponseEntity.ok(lawyerService.getAllLawyers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(lawyerService.getLawyerById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Lawyer lawyer) {
        try {
            return ResponseEntity.ok(lawyerService.updateLawyer(id, lawyer));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}