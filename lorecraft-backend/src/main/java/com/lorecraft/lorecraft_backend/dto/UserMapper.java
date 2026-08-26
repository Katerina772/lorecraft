
package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.User;

public final class UserMapper {

    private UserMapper() {
    }

    public static UserResponseDto toResponse(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getAvatar(),
                user.getDescription(),
                user.getBirthDate(),
                user.getRole().name(),
                user.getCreatedAt(),
                user.getLastLogin(),
                user.isActive()
        );
    }
}