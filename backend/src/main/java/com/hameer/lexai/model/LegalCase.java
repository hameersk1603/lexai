package com.hameer.lexai.model;

import com.hameer.lexai.enums.CaseStatus;
import com.hameer.lexai.enums.Specialty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "legal_cases")
public class LegalCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 5000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Specialty category;

    @Enumerated(EnumType.STRING)
    private CaseStatus status = CaseStatus.OPEN;

    @Column(length = 10000)
    private String aiSummary;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"password"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "lawyer_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"user", "bio"})
    private Lawyer lawyer;

    @Column
    private LocalDateTime createdAt;
}