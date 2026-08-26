package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record QuestRequestDto(

        @NotNull(message = "Genre is required")
        Long genreId,

        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title is too long")
        String title,

        String description,

        Long coverMediaId,

        @NotNull(message = "Age rating is required")
        String ageRating
) {
}