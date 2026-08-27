package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.SceneMapper;
import com.lorecraft.lorecraft_backend.dto.SceneRequestDto;
import com.lorecraft.lorecraft_backend.dto.SceneResponseDto;
import com.lorecraft.lorecraft_backend.entity.Media;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.entity.Scene;
import com.lorecraft.lorecraft_backend.repository.MediaRepository;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import com.lorecraft.lorecraft_backend.repository.SceneRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SceneService {

    private final SceneRepository sceneRepository;
    private final QuestRepository questRepository;
    private final MediaRepository mediaRepository;

    public SceneService(
            SceneRepository sceneRepository,
            QuestRepository questRepository,
            MediaRepository mediaRepository
    ) {
        this.sceneRepository = sceneRepository;
        this.questRepository = questRepository;
        this.mediaRepository = mediaRepository;
    }

    public List<SceneResponseDto> getAllScenes() {
        return sceneRepository.findAll()
                .stream()
                .map(SceneMapper::toResponse)
                .toList();
    }

    public SceneResponseDto getSceneById(Long id) {
        Scene scene = sceneRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Scene not found with id: " + id
                        )
                );

        return SceneMapper.toResponse(scene);
    }

    public List<SceneResponseDto> getScenesByQuest(Long questId) {
        return sceneRepository.findByQuestIdOrderByOrderNumberAsc(questId)
                .stream()
                .map(SceneMapper::toResponse)
                .toList();
    }

    public SceneResponseDto createScene(SceneRequestDto request) {

        Quest quest = questRepository.findById(request.questId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: "
                                        + request.questId()
                        )
                );

        Media backgroundMedia = findMedia(
                request.backgroundMediaId(),
                "Background media"
        );

        Media characterMedia = findMedia(
                request.characterMediaId(),
                "Character media"
        );

        Media audioMedia = findMedia(
                request.audioMediaId(),
                "Audio media"
        );

        Scene scene = new Scene();

        scene.setQuest(quest);
        scene.setTitle(request.title());
        scene.setText(request.text());

        scene.setBackgroundMedia(backgroundMedia);
        scene.setCharacterName(request.characterName());
        scene.setCharacterMedia(characterMedia);
        scene.setAudioMedia(audioMedia);

        scene.setOrderNumber(request.orderNumber());
        scene.setEnding(request.ending());
        scene.setEndingType(parseEndingType(request.endingType()));

        Scene savedScene = sceneRepository.save(scene);

        return SceneMapper.toResponse(savedScene);
    }

    public SceneResponseDto updateScene(
            Long id,
            SceneRequestDto request
    ) {
        Scene scene = sceneRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Scene not found with id: " + id
                        )
                );

        Quest quest = questRepository.findById(request.questId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: "
                                        + request.questId()
                        )
                );

        Media backgroundMedia = findMedia(
                request.backgroundMediaId(),
                "Background media"
        );

        Media characterMedia = findMedia(
                request.characterMediaId(),
                "Character media"
        );

        Media audioMedia = findMedia(
                request.audioMediaId(),
                "Audio media"
        );

        scene.setQuest(quest);
        scene.setTitle(request.title());
        scene.setText(request.text());

        scene.setBackgroundMedia(backgroundMedia);
        scene.setCharacterName(request.characterName());
        scene.setCharacterMedia(characterMedia);
        scene.setAudioMedia(audioMedia);

        scene.setOrderNumber(request.orderNumber());
        scene.setEnding(request.ending());
        scene.setEndingType(parseEndingType(request.endingType()));

        Scene updatedScene = sceneRepository.save(scene);

        return SceneMapper.toResponse(updatedScene);
    }

    public void deleteScene(Long id) {
        if (!sceneRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Scene not found with id: " + id
            );
        }

        sceneRepository.deleteById(id);
    }

    private Media findMedia(Long mediaId, String mediaName) {

        if (mediaId == null) {
            return null;
        }

        return mediaRepository.findById(mediaId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                mediaName + " not found with id: " + mediaId
                        )
                );
    }

    private Scene.EndingType parseEndingType(String endingType) {

        if (endingType == null || endingType.isBlank()) {
            return null;
        }

        try {
            return Scene.EndingType.valueOf(
                    endingType.toUpperCase()
            );
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException(
                    "Invalid ending type: " + endingType
            );
        }
    }
}