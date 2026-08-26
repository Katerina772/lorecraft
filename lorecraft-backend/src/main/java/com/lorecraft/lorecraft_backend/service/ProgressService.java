package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Progress;
import com.lorecraft.lorecraft_backend.repository.ProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public Optional<Progress> getProgress(Long userId, Long questId) {
        return progressRepository.findByUserIdAndQuestId(userId, questId);
    }

    public List<Progress> getUserProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    public List<Progress> getQuestProgress(Long questId) {
        return progressRepository.findByQuestId(questId);
    }

    public Progress saveProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    public void deleteProgress(Long id) {
        progressRepository.deleteById(id);
    }
}