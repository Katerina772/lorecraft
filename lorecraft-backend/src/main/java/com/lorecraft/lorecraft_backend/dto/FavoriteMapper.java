package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Favorite;

public final class FavoriteMapper {

    private FavoriteMapper() {
    }

    public static FavoriteResponseDto toResponse(Favorite favorite) {
        return new FavoriteResponseDto(
                favorite.getId(),
                favorite.getUser().getId(),
                favorite.getQuest().getId(),
                favorite.getAddedAt()
        );
    }
}