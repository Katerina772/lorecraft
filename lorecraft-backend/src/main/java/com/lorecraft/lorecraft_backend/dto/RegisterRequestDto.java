package com.lorecraft.lorecraft_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record RegisterRequestDto(

        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must contain 3-50 characters")
        String username,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email")
        @Size(max = 100, message = "Email is too long")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 6, max = 100, message = "Password must contain at least 6 characters")
        String password,

        @NotNull(message = "Birth date is required")
        @Past(message = "Birth date must be in the past")
        LocalDate birthDate

) {
}