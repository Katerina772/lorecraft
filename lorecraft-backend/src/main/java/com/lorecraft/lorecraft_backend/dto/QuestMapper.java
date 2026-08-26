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
                quest.getAgeRating().name(),
                quest.getStatus().name(),
                quest.getAverageRating(),
                quest.getPlayCount(),
                quest.getCreatedAt(),
                quest.getUpdatedAt()
        );
    }
}