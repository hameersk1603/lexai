package com.hameer.lexai.model;

import com.hameer.lexai.enums.Specialty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "lawyers")
public class Lawyer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Specialty specialty;

    @Column
    private String barNumber;

    @Column
    private int experience;

    @Column
    private String city;

    @Column
    private String bio;

    @Column
    private double rating = 0.0;

    @Column
    private boolean available = true;

    @Column
    private LocalDateTime createdAt;
}