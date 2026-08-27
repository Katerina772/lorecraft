package com.lorecraft.lorecraft_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "\"Scene\"")
@Getter
@Setter
@NoArgsConstructor
public class Scene {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "background_media_id")
    private Media backgroundMedia;

    @Column(name = "character_name", length = 100)
    private String characterName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_media_id")
    private Media characterMedia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audio_media_id")
    private Media audioMedia;

    @Column(name = "order_number", nullable = false)
    private Integer orderNumber;

    @Column(name = "is_ending", nullable = false)
    private boolean ending = false;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "ending_type")
    private EndingType endingType;

    public enum EndingType {
        GOOD,
        BAD,
        SECRET
    }
}