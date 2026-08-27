package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.QuestRequestDto;
import com.lorecraft.lorecraft_backend.dto.QuestResponseDto;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.service.QuestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quests")
public class QuestController {

    private final QuestService questService;

    public QuestController(QuestService questService) {
        this.questService = questService;
    }

    @GetMapping
    public List<QuestResponseDto> getAllQuests() {
        return questService.getAllQuests();
    }

    @GetMapping("/{id}")
    public QuestResponseDto getQuestById(@PathVariable Long id) {
        return questService.getQuestById(id);
    }

    @GetMapping("/author/{authorId}")
    public List<QuestResponseDto> getQuestsByAuthor(
            @PathVariable Long authorId
    ) {
        return questService.getQuestsByAuthor(authorId);
    }

    @GetMapping("/genre/{genreId}")
    public List<QuestResponseDto> getQuestsByGenre(
            @PathVariable Long genreId
    ) {
        return questService.getQuestsByGenre(genreId);
    }

    @GetMapping("/status/{status}")
    public List<QuestResponseDto> getQuestsByStatus(
            @PathVariable Quest.QuestStatus status
    ) {
        return questService.getQuestsByStatus(status);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuestResponseDto createQuest(
            @Valid @RequestBody QuestRequestDto request,
            @RequestParam Long authorId
    ) {
        return questService.createQuest(request, authorId);
    }

    @PutMapping("/{id}")
    public QuestResponseDto updateQuest(
            @PathVariable Long id,
            @Valid @RequestBody QuestRequestDto request
    ) {
        return questService.updateQuest(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuest(@PathVariable Long id) {
        questService.deleteQuest(id);
    }
}