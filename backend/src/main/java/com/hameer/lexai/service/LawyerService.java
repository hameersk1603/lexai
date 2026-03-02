package com.hameer.lexai.service;

import com.hameer.lexai.enums.Specialty;
import com.hameer.lexai.model.Lawyer;
import com.hameer.lexai.model.User;
import com.hameer.lexai.repository.LawyerRepository;
import com.hameer.lexai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LawyerService {

    @Autowired
    private LawyerRepository lawyerRepository;

    @Autowired
    private UserRepository userRepository;

    public Lawyer createLawyerProfile(Long userId, Lawyer lawyer) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        lawyer.setUser(user);
        lawyer.setCreatedAt(LocalDateTime.now());
        return lawyerRepository.save(lawyer);
    }

    public List<Lawyer> getAllLawyers() {
        return lawyerRepository.findAll();
    }

    public List<Lawyer> getAvailableLawyers() {
        return lawyerRepository.findByAvailableTrue();
    }

    public List<Lawyer> getLawyersBySpecialty(Specialty specialty) {
        return lawyerRepository.findBySpecialty(specialty);
    }

    public List<Lawyer> getLawyersByCity(String city) {
        return lawyerRepository.findByCity(city);
    }

    public List<Lawyer> getLawyersBySpecialtyAndCity(Specialty specialty, String city) {
        return lawyerRepository.findBySpecialtyAndCity(specialty, city);
    }

    public Lawyer getLawyerById(Long id) {
        return lawyerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lawyer not found"));
    }

    public Lawyer updateLawyer(Long id, Lawyer updated) {
        Lawyer lawyer = getLawyerById(id);
        lawyer.setSpecialty(updated.getSpecialty());
        lawyer.setBio(updated.getBio());
        lawyer.setExperience(updated.getExperience());
        lawyer.setCity(updated.getCity());
        lawyer.setAvailable(updated.isAvailable());
        return lawyerRepository.save(lawyer);
    }
}