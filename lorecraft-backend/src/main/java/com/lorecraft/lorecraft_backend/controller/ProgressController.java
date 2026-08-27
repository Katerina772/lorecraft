package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.ProgressRequestDto;
import com.lorecraft.lorecraft_backend.dto.ProgressResponseDto;
import com.lorecraft.lorecraft_backend.service.ProgressService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<ProgressResponseDto> getAllProgress() {
        return progressService.getAllProgress();
    }

    @GetMapping("/{id}")
    public ProgressResponseDto getProgressById(
            @PathVariable Long id
    ) {
        return progressService.getProgressById(id);
    }

    @GetMapping("/user/{userId}/quest/{questId}")
    public ProgressResponseDto getProgressByUserAndQuest(
            @PathVariable Long userId,
            @PathVariable Long questId
    ) {
        return progressService.getProgressByUserAndQuest(
                userId,
                questId
        );
    }

    @GetMapping("/user/{userId}")
    public List<ProgressResponseDto> getProgressByUser(
            @PathVariable Long userId
    ) {
        return progressService.getProgressByUser(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProgressResponseDto createProgress(
            @Valid @RequestBody ProgressRequestDto request
    ) {
        return progressService.createProgress(request);
    }

    @PutMapping("/{id}")
    public ProgressResponseDto updateProgress(
            @PathVariable Long id,
            @Valid @RequestBody ProgressRequestDto request
    ) {
        return progressService.updateProgress(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgress(@PathVariable Long id) {
        progressService.deleteProgress(id);
    }
}