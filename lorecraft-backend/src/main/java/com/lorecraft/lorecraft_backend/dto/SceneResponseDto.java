package com.lorecraft.lorecraft_backend.dto;

public record SceneResponseDto(
        Long id,
        Long questId,
        String title,
        String text,
        Long backgroundMediaId,
        String characterName,
        Long characterMediaId,
        Long audioMediaId,
        Integer orderNumber,
        boolean ending,
        String endingType
) {
}