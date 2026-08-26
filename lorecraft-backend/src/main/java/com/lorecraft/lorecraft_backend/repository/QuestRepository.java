package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestRepository extends JpaRepository<Quest, Long> {

    List<Quest> findByAuthorId(Long authorId);

    List<Quest> findByGenreId(Long genreId);

    List<Quest> findByStatus(Quest.QuestStatus status);
}