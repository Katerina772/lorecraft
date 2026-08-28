package com.lorecraft.lorecraft_backend.dto;

import com.lorecraft.lorecraft_backend.entity.QuestVariable;

public final class QuestVariableMapper {

    private QuestVariableMapper() {
    }

    public static QuestVariableResponseDto toResponse(
            QuestVariable variable
    ) {
        return new QuestVariableResponseDto(
                variable.getId(),
                variable.getQuest().getId(),
                variable.getName(),
                variable.isDefaultValue()
        );
    }
}