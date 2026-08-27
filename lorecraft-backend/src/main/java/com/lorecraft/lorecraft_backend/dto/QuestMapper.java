package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Quest;

public final class QuestMapper {

    private QuestMapper() {
    }

    public static QuestResponseDto toResponse(Quest quest) {
        return new QuestResponseDto(
                quest.getId(),
                quest.getAuthor().getId(),
                quest.getAuthor().getUsername(),
                quest.getGenre().getId(),
                quest.getTitle(),
                quest.getDescription(),
                quest.getCoverMedia() != null
                        ? quest.getCoverMedia().getId()
                        : null,
                convertAgeRating(quest.getAgeRating()),
                quest.getStatus().name(),
                quest.getAverageRating(),
                quest.getPlayCount(),
                quest.getCreatedAt(),
                quest.getUpdatedAt()
        );
    }

    private static String convertAgeRating(Quest.AgeRating ageRating) {
        if (ageRating == null) {
            return null;
        }

        return switch (ageRating) {
            case AGE_6 -> "6+";
            case AGE_12 -> "12+";
            case AGE_16 -> "16+";
            case AGE_18 -> "18+";
        };
    }
}