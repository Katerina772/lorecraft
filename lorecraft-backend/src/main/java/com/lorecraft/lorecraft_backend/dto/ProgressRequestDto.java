package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ProgressRequestDto(

        @NotNull(message = "User is required")
        Long userId,

        @NotNull(message = "Quest is required")
        Long questId,

        @NotNull(message = "Current scene is required")
        Long currentSceneId,

        @Min(value = 0, message = "Progress cannot be less than 0")
        @Max(value = 100, message = "Progress cannot be greater than 100")
        Integer progressPercent,

        Boolean completed
) {
}