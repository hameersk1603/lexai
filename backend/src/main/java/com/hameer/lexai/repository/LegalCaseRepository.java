package com.hameer.lexai.repository;

import com.hameer.lexai.model.LegalCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LegalCaseRepository extends JpaRepository<LegalCase, Long> {
    List<LegalCase> findByUserId(Long userId);
    List<LegalCase> findByLawyerId(Long lawyerId);
}