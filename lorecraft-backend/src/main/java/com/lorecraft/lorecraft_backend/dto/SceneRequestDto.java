package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SceneRequestDto(

        @NotNull(message = "Quest is required")
        Long questId,

        @NotBlank(message = "Scene title is required")
        @Size(max = 150, message = "Scene title is too long")
        String title,

        @NotBlank(message = "Scene text is required")
        String text,

        Long backgroundMediaId,

        @Size(max = 100, message = "Character name is too long")
        String characterName,

        Long characterMediaId,

        Long audioMediaId,

        @NotNull(message = "Order number is required")
        Integer orderNumber,

        boolean ending,

        String endingType
) {
}