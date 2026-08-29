package com.lorecraft.lorecraft_backend.dto;

public record LoginResponseDto(
        String message,
        String token,
        UserResponseDto user
) {
}