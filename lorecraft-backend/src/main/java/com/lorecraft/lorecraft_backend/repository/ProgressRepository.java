package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProgressRepository
        extends JpaRepository<Progress, Long> {

    Optional<Progress> findByUserIdAndQuestId(
            Long userId,
            Long questId
    );

    List<Progress> findByUserId(Long userId);

    long countByQuestIdAndCompletedTrue(Long questId);
}