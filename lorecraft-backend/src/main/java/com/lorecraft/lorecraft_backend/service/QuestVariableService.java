package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.QuestVariableMapper;
import com.lorecraft.lorecraft_backend.dto.QuestVariableRequestDto;
import com.lorecraft.lorecraft_backend.dto.QuestVariableResponseDto;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.entity.QuestVariable;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import com.lorecraft.lorecraft_backend.repository.QuestVariableRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class QuestVariableService {

    private final QuestVariableRepository questVariableRepository;
    private final QuestRepository questRepository;

    public QuestVariableService(
            QuestVariableRepository questVariableRepository,
            QuestRepository questRepository
    ) {
        this.questVariableRepository = questVariableRepository;
        this.questRepository = questRepository;
    }

    public List<QuestVariableResponseDto> getAllVariables() {
        return questVariableRepository.findAll()
                .stream()
                .map(QuestVariableMapper::toResponse)
                .toList();
    }

    public QuestVariableResponseDto getVariableById(Long id) {
        QuestVariable variable = questVariableRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest variable not found with id: " + id
                        )
                );

        return QuestVariableMapper.toResponse(variable);
    }

    public List<QuestVariableResponseDto> getVariablesByQuest(
            Long questId
    ) {
        if (!questRepository.existsById(questId)) {
            throw new IllegalArgumentException(
                    "Quest not found with id: " + questId
            );
        }

        return questVariableRepository.findByQuestId(questId)
                .stream()
                .map(QuestVariableMapper::toResponse)
                .toList();
    }

    public QuestVariableResponseDto getVariableByQuestAndName(
            Long questId,
            String name
    ) {
        QuestVariable variable = questVariableRepository
                .findByQuestIdAndName(questId, name)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest variable not found for questId: "
                                        + questId
                                        + " and name: "
                                        + name
                        )
                );

        return QuestVariableMapper.toResponse(variable);
    }

    public QuestVariableResponseDto createVariable(
            QuestVariableRequestDto request
    ) {
        Quest quest = questRepository.findById(request.questId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: "
                                        + request.questId()
                        )
                );

        if (questVariableRepository
                .findByQuestIdAndName(
                        request.questId(),
                        request.name()
                )
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Quest variable with this name already exists"
            );
        }

        QuestVariable variable = new QuestVariable();

        variable.setQuest(quest);
        variable.setName(request.name());
        variable.setDefaultValue(request.defaultValue());

        QuestVariable savedVariable =
                questVariableRepository.save(variable);

        return QuestVariableMapper.toResponse(savedVariable);
    }

    public QuestVariableResponseDto updateVariable(
            Long id,
            QuestVariableRequestDto request
    ) {
        QuestVariable variable = questVariableRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest variable not found with id: " + id
                        )
                );

        Quest quest = questRepository.findById(request.questId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: "
                                        + request.questId()
                        )
                );

        questVariableRepository
                .findByQuestIdAndName(
                        request.questId(),
                        request.name()
                )
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new IllegalArgumentException(
                                "Quest variable with this name already exists"
                        );
                    }
                });

        variable.setQuest(quest);
        variable.setName(request.name());
        variable.setDefaultValue(request.defaultValue());

        QuestVariable updatedVariable =
                questVariableRepository.save(variable);

        return QuestVariableMapper.toResponse(updatedVariable);
    }

    public void deleteVariable(Long id) {
        if (!questVariableRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Quest variable not found with id: " + id
            );
        }

        questVariableRepository.deleteById(id);
    }
}