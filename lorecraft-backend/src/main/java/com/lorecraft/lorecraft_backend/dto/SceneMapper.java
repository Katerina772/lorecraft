package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Scene;

public final class SceneMapper {

    private SceneMapper() {
    }

    public static SceneResponseDto toResponse(Scene scene) {
        return new SceneResponseDto(
                scene.getId(),
                scene.getQuest().getId(),
                scene.getTitle(),
                scene.getText(),
                scene.getBackgroundMedia() != null
                        ? scene.getBackgroundMedia().getId()
                        : null,
                scene.getCharacterName(),
                scene.getCharacterMedia() != null
                        ? scene.getCharacterMedia().getId()
                        : null,
                scene.getAudioMedia() != null
                        ? scene.getAudioMedia().getId()
                        : null,
                scene.getOrderNumber(),
                scene.isEnding(),
                scene.getEndingType() != null
                        ? scene.getEndingType().name()
                        : null
        );
    }
}