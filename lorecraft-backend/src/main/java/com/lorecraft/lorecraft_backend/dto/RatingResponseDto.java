package com.lorecraft.lorecraft_backend.dto;

import java.time.LocalDateTime;

public record RatingResponseDto(
        Long id,
        Long userId,
        Long questId,
        Short rating,
        LocalDateTime createdAt
) {
}