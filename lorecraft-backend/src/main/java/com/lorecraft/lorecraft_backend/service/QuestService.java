package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestService {

    private final QuestRepository questRepository;

    public QuestService(QuestRepository questRepository) {
        this.questRepository = questRepository;
    }

    public List<Quest> getAllQuests() {
        return questRepository.findAll();
    }

    public Optional<Quest> getQuestById(Long id) {
        return questRepository.findById(id);
    }

    public List<Quest> getQuestsByAuthor(Long authorId) {
        return questRepository.findByAuthorId(authorId);
    }

    public List<Quest> getQuestsByGenre(Long genreId) {
        return questRepository.findByGenreId(genreId);
    }

    public List<Quest> getQuestsByStatus(Quest.QuestStatus status) {
        return questRepository.findByStatus(status);
    }

    public Quest saveQuest(Quest quest) {
        return questRepository.save(quest);
    }

    public void deleteQuest(Long id) {
        questRepository.deleteById(id);
    }
}