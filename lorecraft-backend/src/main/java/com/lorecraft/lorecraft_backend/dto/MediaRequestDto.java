package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Media;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MediaRequestDto(

        @NotNull(message = "Owner is required")
        Long ownerId,

        @NotBlank(message = "File name is required")
        String fileName,

        @NotBlank(message = "File path is required")
        String filePath,

        @NotNull(message = "Media type is required")
        Media.MediaType mediaType,

        Boolean publicMedia
) {
}