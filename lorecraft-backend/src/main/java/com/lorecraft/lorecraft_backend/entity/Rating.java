package com.lorecraft.lorecraft_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "\"Rating\"",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_rating_user_quest",
                        columnNames = {"user_id", "quest_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @Column(name = "rating", nullable = false)
    private Short rating;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}