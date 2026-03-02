package com.hameer.lexai.repository;

import com.hameer.lexai.enums.Specialty;
import com.hameer.lexai.model.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LawyerRepository extends JpaRepository<Lawyer, Long> {
    List<Lawyer> findBySpecialty(Specialty specialty);
    List<Lawyer> findByAvailableTrue();
    List<Lawyer> findByCity(String city);
    List<Lawyer> findBySpecialtyAndCity(Specialty specialty, String city);
}