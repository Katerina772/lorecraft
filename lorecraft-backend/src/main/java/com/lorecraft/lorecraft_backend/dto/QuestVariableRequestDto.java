package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record QuestVariableRequestDto(

        @NotNull(message = "Quest is required")
        Long questId,

        @NotBlank(message = "Variable name is required")
        @Size(max = 100, message = "Variable name is too long")
        String name,

        @NotNull(message = "Default value is required")
        Boolean defaultValue
) {
}