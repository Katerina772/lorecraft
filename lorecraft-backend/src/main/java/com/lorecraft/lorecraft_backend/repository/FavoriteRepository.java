package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserIdAndQuestId(Long userId, Long questId);

    List<Favorite> findByUserId(Long userId);

    List<Favorite> findByQuestId(Long questId);

    boolean existsByUserIdAndQuestId(Long userId, Long questId);
}