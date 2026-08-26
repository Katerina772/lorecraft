package com.lorecraft.lorecraft_backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record UserResponseDto(
        Long id,
        String username,
        String email,
        String avatar,
        String description,
        LocalDate birthDate,
        String role,
        LocalDateTime createdAt,
        LocalDateTime lastLogin,
        boolean active
) {
}