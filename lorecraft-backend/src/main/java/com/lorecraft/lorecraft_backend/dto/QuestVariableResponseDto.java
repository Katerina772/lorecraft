package com.lorecraft.lorecraft_backend.dto;

public record QuestVariableResponseDto(
        Long id,
        Long questId,
        String name,
        boolean defaultValue
) {
}