package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChoiceRequestDto(

        @NotNull(message = "Scene is required")
        Long sceneId,

        @NotBlank(message = "Choice text is required")
        @Size(max = 255, message = "Choice text is too long")
        String text,

        @NotNull(message = "Next scene is required")
        Long nextSceneId
) {
}