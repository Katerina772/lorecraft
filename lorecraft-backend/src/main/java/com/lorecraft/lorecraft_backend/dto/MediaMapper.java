package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Media;

public final class MediaMapper {

    private MediaMapper() {
    }

    public static MediaResponseDto toResponse(Media media) {
        return new MediaResponseDto(
                media.getId(),
                media.getOwner().getId(),
                media.getFileName(),
                media.getFilePath(),
                media.getMediaType(),
                media.isPublicMedia(),
                media.getUploadedAt()
        );
    }
}