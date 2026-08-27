package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.SceneRequestDto;
import com.lorecraft.lorecraft_backend.dto.SceneResponseDto;
import com.lorecraft.lorecraft_backend.service.SceneService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scenes")
public class SceneController {

    private final SceneService sceneService;

    public SceneController(SceneService sceneService) {
        this.sceneService = sceneService;
    }

    @GetMapping
    public List<SceneResponseDto> getAllScenes() {
        return sceneService.getAllScenes();
    }

    @GetMapping("/{id}")
    public SceneResponseDto getSceneById(@PathVariable Long id) {
        return sceneService.getSceneById(id);
    }

    @GetMapping("/quest/{questId}")
    public List<SceneResponseDto> getScenesByQuest(
            @PathVariable Long questId
    ) {
        return sceneService.getScenesByQuest(questId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SceneResponseDto createScene(
            @Valid @RequestBody SceneRequestDto request
    ) {
        return sceneService.createScene(request);
    }

    @PutMapping("/{id}")
    public SceneResponseDto updateScene(
            @PathVariable Long id,
            @Valid @RequestBody SceneRequestDto request
    ) {
        return sceneService.updateScene(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteScene(@PathVariable Long id) {
        sceneService.deleteScene(id);
    }
}