package com.lorecraft.lorecraft_backend.dto;

public record QuestStatisticsResponseDto(
        Long questId,
        Integer playCount,
        Double averageRating,
        Long ratingCount,
        Long completedCount
) {
}