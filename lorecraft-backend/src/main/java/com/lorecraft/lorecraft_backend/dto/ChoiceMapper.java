package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.Choice;

public final class ChoiceMapper {

    private ChoiceMapper() {
    }

    public static ChoiceResponseDto toResponse(Choice choice) {
        return new ChoiceResponseDto(
                choice.getId(),
                choice.getScene().getId(),
                choice.getText(),
                choice.getNextScene().getId()
        );
    }
}