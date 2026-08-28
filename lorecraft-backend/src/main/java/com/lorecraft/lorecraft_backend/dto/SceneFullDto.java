package com.lorecraft.lorecraft_backend.dto;

import java.util.List;

public record SceneFullDto(
        Long id,
        String title,
        String text,
        Long backgroundMediaId,
        String characterName,
        Long characterMediaId,
        Long audioMediaId,
        Integer orderNumber,
        boolean ending,
        String endingType,
        List<ChoiceFullDto> choices
) {
}