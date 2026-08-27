package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.NotNull;

public record FavoriteRequestDto(

        @NotNull(message = "User is required")
        Long userId,

        @NotNull(message = "Quest is required")
        Long questId
) {
}