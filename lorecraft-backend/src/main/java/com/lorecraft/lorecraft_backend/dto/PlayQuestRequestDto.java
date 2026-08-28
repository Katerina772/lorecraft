package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.NotNull;

public record PlayQuestRequestDto(

        @NotNull(message = "User is required")
        Long userId,

        @NotNull(message = "Quest is required")
        Long questId,

        @NotNull(message = "Choice is required")
        Long choiceId
) {
}