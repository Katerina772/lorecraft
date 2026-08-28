package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RatingRequestDto(

        @NotNull(message = "User is required")
        Long userId,

        @NotNull(message = "Quest is required")
        Long questId,

        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating must be at most 5")
        Short rating
) {
}