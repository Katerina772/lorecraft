package com.lorecraft.lorecraft_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "\"QuestVariable\"")
@Getter
@Setter
@NoArgsConstructor
public class QuestVariable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "default_value", nullable = false)
    private boolean defaultValue;
}