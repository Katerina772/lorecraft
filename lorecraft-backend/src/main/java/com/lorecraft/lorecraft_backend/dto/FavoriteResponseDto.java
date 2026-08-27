package com.lorecraft.lorecraft_backend.dto;

import java.time.LocalDateTime;

public record FavoriteResponseDto(
        Long id,
        Long userId,
        Long questId,
        LocalDateTime addedAt
) {
}