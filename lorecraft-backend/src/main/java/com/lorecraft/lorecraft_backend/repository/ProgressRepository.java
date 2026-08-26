package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

    Optional<Progress> findByUserIdAndQuestId(
            Long userId,
            Long questId
    );

    List<Progress> findByUserId(Long userId);

    List<Progress> findByQuestId(Long questId);
}