package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Progress;

public final class ProgressMapper {

    private ProgressMapper() {
    }

    public static ProgressResponseDto toResponse(Progress progress) {
        return new ProgressResponseDto(
                progress.getId(),
                progress.getUser().getId(),
                progress.getQuest().getId(),
                progress.getCurrentScene().getId(),
                progress.getProgressPercent(),
                progress.getLastPlayed(),
                progress.isCompleted()
        );
    }
}