package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.QuestVariable;
import com.lorecraft.lorecraft_backend.repository.QuestVariableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestVariableService {

    private final QuestVariableRepository questVariableRepository;

    public QuestVariableService(
            QuestVariableRepository questVariableRepository
    ) {
        this.questVariableRepository = questVariableRepository;
    }

    public List<QuestVariable> getVariablesByQuest(Long questId) {
        return questVariableRepository.findByQuestId(questId);
    }

    public Optional<QuestVariable> getVariableById(Long id) {
        return questVariableRepository.findById(id);
    }

    public Optional<QuestVariable> getVariableByName(
            Long questId,
            String name
    ) {
        return questVariableRepository.findByQuestIdAndName(
                questId,
                name
        );
    }

    public QuestVariable saveVariable(QuestVariable variable) {
        return questVariableRepository.save(variable);
    }

    public void deleteVariable(Long id) {
        questVariableRepository.deleteById(id);
    }
}