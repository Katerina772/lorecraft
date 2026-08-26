package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.QuestVariable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestVariableRepository
        extends JpaRepository<QuestVariable, Long> {

    List<QuestVariable> findByQuestId(Long questId);

    Optional<QuestVariable> findByQuestIdAndName(
            Long questId,
            String name
    );
}