package com.lorecraft.lorecraft_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record QuestResponseDto(
        Long id,
        Long authorId,
        String authorName,
        Long genreId,
        String title,
        String description,
        Long coverMediaId,
        String ageRating,
        String status,
        BigDecimal averageRating,
        Integer playCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}