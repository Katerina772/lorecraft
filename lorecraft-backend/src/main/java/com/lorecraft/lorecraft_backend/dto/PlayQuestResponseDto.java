package com.lorecraft.lorecraft_backend.dto;

public record PlayQuestResponseDto(
        Long questId,
        Long currentSceneId,
        Integer progressPercent,
        boolean completed,
        Long nextChoiceId
) {
}