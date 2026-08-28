package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.QuestVariableRequestDto;
import com.lorecraft.lorecraft_backend.dto.QuestVariableResponseDto;
import com.lorecraft.lorecraft_backend.service.QuestVariableService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quest-variables")
public class QuestVariableController {

    private final QuestVariableService questVariableService;

    public QuestVariableController(
            QuestVariableService questVariableService
    ) {
        this.questVariableService = questVariableService;
    }

    @GetMapping
    public List<QuestVariableResponseDto> getAllVariables() {
        return questVariableService.getAllVariables();
    }

    @GetMapping("/{id}")
    public QuestVariableResponseDto getVariableById(
            @PathVariable Long id
    ) {
        return questVariableService.getVariableById(id);
    }

    @GetMapping("/quest/{questId}")
    public List<QuestVariableResponseDto> getVariablesByQuest(
            @PathVariable Long questId
    ) {
        return questVariableService.getVariablesByQuest(questId);
    }

    @GetMapping("/quest/{questId}/name/{name}")
    public QuestVariableResponseDto getVariableByQuestAndName(
            @PathVariable Long questId,
            @PathVariable String name
    ) {
        return questVariableService.getVariableByQuestAndName(
                questId,
                name
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuestVariableResponseDto createVariable(
            @Valid @RequestBody QuestVariableRequestDto request
    ) {
        return questVariableService.createVariable(request);
    }

    @PutMapping("/{id}")
    public QuestVariableResponseDto updateVariable(
            @PathVariable Long id,
            @Valid @RequestBody QuestVariableRequestDto request
    ) {
        return questVariableService.updateVariable(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVariable(
            @PathVariable Long id
    ) {
        questVariableService.deleteVariable(id);
    }
}