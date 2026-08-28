package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Rating;

public final class RatingMapper {

    private RatingMapper() {
    }

    public static RatingResponseDto toResponse(Rating rating) {
        return new RatingResponseDto(
                rating.getId(),
                rating.getUser().getId(),
                rating.getQuest().getId(),
                rating.getRating(),
                rating.getCreatedAt()
        );
    }
}