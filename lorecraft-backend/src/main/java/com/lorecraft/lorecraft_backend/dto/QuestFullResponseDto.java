package com.lorecraft.lorecraft_backend.dto;

import java.util.List;

public record QuestFullResponseDto(
        QuestMetaDto meta,
        List<SceneFullDto> scenes
) {
}