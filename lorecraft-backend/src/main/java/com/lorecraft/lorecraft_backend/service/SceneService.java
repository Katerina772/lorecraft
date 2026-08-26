package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Scene;
import com.lorecraft.lorecraft_backend.repository.SceneRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SceneService {

    private final SceneRepository sceneRepository;

    public SceneService(SceneRepository sceneRepository) {
        this.sceneRepository = sceneRepository;
    }

    public List<Scene> getScenesByQuest(Long questId) {
        return sceneRepository.findByQuestIdOrderByOrderNumberAsc(questId);
    }

    public Optional<Scene> getSceneById(Long id) {
        return sceneRepository.findById(id);
    }

    public Scene saveScene(Scene scene) {
        return sceneRepository.save(scene);
    }

    public void deleteScene(Long id) {
        sceneRepository.deleteById(id);
    }
}