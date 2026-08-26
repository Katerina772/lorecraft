package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByUserIdAndQuestId(
            Long userId,
            Long questId
    );

    List<Rating> findByQuestId(Long questId);

    List<Rating> findByUserId(Long userId);
}