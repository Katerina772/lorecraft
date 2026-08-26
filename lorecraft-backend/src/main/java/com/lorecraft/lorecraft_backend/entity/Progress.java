package com.lorecraft.lorecraft_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "\"Progress\"",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_progress_user_quest",
                        columnNames = {"user_id", "quest_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "current_scene_id", nullable = false)
    private Scene currentScene;

    @Column(name = "progress_percent", nullable = false)
    private Integer progressPercent = 0;

    @Column(name = "last_played", nullable = false)
    private LocalDateTime lastPlayed;

    @Column(name = "is_completed", nullable = false)
    private boolean completed = false;
}