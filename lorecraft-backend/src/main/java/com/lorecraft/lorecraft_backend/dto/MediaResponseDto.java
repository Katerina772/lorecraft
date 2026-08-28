package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Media;

import java.time.LocalDateTime;

public record MediaResponseDto(
        Long id,
        Long ownerId,
        String fileName,
        String filePath,
        Media.MediaType mediaType,
        boolean publicMedia,
        LocalDateTime uploadedAt
) {
}