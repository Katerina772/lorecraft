package com.lorecraft.lorecraft_backend.dto;

public record ChoiceResponseDto(
        Long id,
        Long sceneId,
        String text,
        Long nextSceneId
) {
}