package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.ProgressMapper;
import com.lorecraft.lorecraft_backend.dto.ProgressRequestDto;
import com.lorecraft.lorecraft_backend.dto.ProgressResponseDto;
import com.lorecraft.lorecraft_backend.entity.Progress;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.entity.Scene;
import com.lorecraft.lorecraft_backend.entity.User;
import com.lorecraft.lorecraft_backend.repository.ProgressRepository;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import com.lorecraft.lorecraft_backend.repository.SceneRepository;
import com.lorecraft.lorecraft_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ProgressService {

    private final ProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final QuestRepository questRepository;
    private final SceneRepository sceneRepository;

    public ProgressService(
            ProgressRepository progressRepository,
            UserRepository userRepository,
            QuestRepository questRepository,
            SceneRepository sceneRepository
    ) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.questRepository = questRepository;
        this.sceneRepository = sceneRepository;
    }

    public List<ProgressResponseDto> getAllProgress() {
        return progressRepository.findAll()
                .stream()
                .map(ProgressMapper::toResponse)
                .toList();
    }

    public ProgressResponseDto getProgressById(Long id) {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Progress not found with id: " + id
                        )
                );

        return ProgressMapper.toResponse(progress);
    }

    public ProgressResponseDto getProgressByUserAndQuest(
            Long userId,
            Long questId
    ) {
        Progress progress = progressRepository
                .findByUserIdAndQuestId(userId, questId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Progress not found for userId: "
                                        + userId
                                        + " and questId: "
                                        + questId
                        )
                );

        return ProgressMapper.toResponse(progress);
    }

    public List<ProgressResponseDto> getProgressByUser(Long userId) {
        return progressRepository.findByUserId(userId)
                .stream()
                .map(ProgressMapper::toResponse)
                .toList();
    }

    public ProgressResponseDto createProgress(
            ProgressRequestDto request
    ) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found with id: "
                                        + request.userId()
                        )
                );

        Quest quest = questRepository.findById(request.questId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: "
                                        + request.questId()
                        )
                );

        Scene currentScene = sceneRepository.findById(
                        request.currentSceneId()
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Scene not found with id: "
                                        + request.currentSceneId()
                        )
                );

        if (!currentScene.getQuest().getId().equals(quest.getId())) {
            throw new IllegalArgumentException(
                    "Scene does not belong to the specified quest"
            );
        }

        if (progressRepository.findByUserIdAndQuestId(
                request.userId(),
                request.questId()
        ).isPresent()) {
            throw new IllegalArgumentException(
                    "Progress already exists for this user and quest"
            );
        }

        Progress progress = new Progress();

        progress.setUser(user);
        progress.setQuest(quest);
        progress.setCurrentScene(currentScene);

        progress.setProgressPercent(
                request.progressPercent() != null
                        ? request.progressPercent()
                        : 0
        );

        progress.setCompleted(
                request.completed() != null
                        && request.completed()
        );

        progress.setLastPlayed(LocalDateTime.now());

        Progress savedProgress = progressRepository.save(progress);

        return ProgressMapper.toResponse(savedProgress);
    }

    public ProgressResponseDto updateProgress(
            Long id,
            ProgressRequestDto request
    ) {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Progress not found with id: " + id
                        )
                );

        Scene currentScene = sceneRepository.findById(
                        request.currentSceneId()
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Scene not found with id: "
                                        + request.currentSceneId()
                        )
                );

        if (!currentScene.getQuest().getId()
                .equals(progress.getQuest().getId())) {
            throw new IllegalArgumentException(
                    "Scene does not belong to the progress quest"
            );
        }

        progress.setCurrentScene(currentScene);

        if (request.progressPercent() != null) {
            progress.setProgressPercent(request.progressPercent());
        }

        if (request.completed() != null) {
            progress.setCompleted(request.completed());
        }

        progress.setLastPlayed(LocalDateTime.now());

        Progress updatedProgress = progressRepository.save(progress);

        return ProgressMapper.toResponse(updatedProgress);
    }

    public void deleteProgress(Long id) {
        if (!progressRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Progress not found with id: " + id
            );
        }

        progressRepository.deleteById(id);
    }
}