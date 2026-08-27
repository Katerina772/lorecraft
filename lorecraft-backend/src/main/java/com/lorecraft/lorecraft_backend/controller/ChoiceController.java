package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.ChoiceRequestDto;
import com.lorecraft.lorecraft_backend.dto.ChoiceResponseDto;
import com.lorecraft.lorecraft_backend.service.ChoiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/choices")
public class ChoiceController {

    private final ChoiceService choiceService;

    public ChoiceController(ChoiceService choiceService) {
        this.choiceService = choiceService;
    }

    @GetMapping
    public List<ChoiceResponseDto> getAllChoices() {
        return choiceService.getAllChoices();
    }

    @GetMapping("/{id}")
    public ChoiceResponseDto getChoiceById(@PathVariable Long id) {
        return choiceService.getChoiceById(id);
    }

    @GetMapping("/scene/{sceneId}")
    public List<ChoiceResponseDto> getChoicesByScene(
            @PathVariable Long sceneId
    ) {
        return choiceService.getChoicesByScene(sceneId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ChoiceResponseDto createChoice(
            @Valid @RequestBody ChoiceRequestDto request
    ) {
        return choiceService.createChoice(request);
    }

    @PutMapping("/{id}")
    public ChoiceResponseDto updateChoice(
            @PathVariable Long id,
            @Valid @RequestBody ChoiceRequestDto request
    ) {
        return choiceService.updateChoice(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteChoice(@PathVariable Long id) {
        choiceService.deleteChoice(id);
    }
}