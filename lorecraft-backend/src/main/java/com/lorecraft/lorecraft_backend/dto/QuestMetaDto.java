package com.lorecraft.lorecraft_backend.dto;

public record QuestMetaDto(
        Long id,
        String title,
        String description,
        Long genreId,
        String ageRating,
        Long coverMediaId,
        String status,
        Double averageRating,
        Integer playCount
) {
}