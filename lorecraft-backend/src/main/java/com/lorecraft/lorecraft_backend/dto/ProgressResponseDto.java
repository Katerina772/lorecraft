package com.lorecraft.lorecraft_backend.dto;

import java.time.LocalDateTime;

public record ProgressResponseDto(
        Long id,
        Long userId,
        Long questId,
        Long currentSceneId,
        Integer progressPercent,
        LocalDateTime lastPlayed,
        boolean completed
) {
}