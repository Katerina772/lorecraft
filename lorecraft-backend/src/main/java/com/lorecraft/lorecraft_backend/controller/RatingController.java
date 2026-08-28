package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.RatingRequestDto;
import com.lorecraft.lorecraft_backend.dto.RatingResponseDto;
import com.lorecraft.lorecraft_backend.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping
    public List<RatingResponseDto> getAllRatings() {
        return ratingService.getAllRatings();
    }

    @GetMapping("/{id}")
    public RatingResponseDto getRatingById(
            @PathVariable Long id
    ) {
        return ratingService.getRatingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<RatingResponseDto> getRatingsByUser(
            @PathVariable Long userId
    ) {
        return ratingService.getRatingsByUser(userId);
    }

    @GetMapping("/quest/{questId}")
    public List<RatingResponseDto> getRatingsByQuest(
            @PathVariable Long questId
    ) {
        return ratingService.getRatingsByQuest(questId);
    }

    @GetMapping("/user/{userId}/quest/{questId}")
    public RatingResponseDto getRatingByUserAndQuest(
            @PathVariable Long userId,
            @PathVariable Long questId
    ) {
        return ratingService.getRatingByUserAndQuest(
                userId,
                questId
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RatingResponseDto createRating(
            @Valid @RequestBody RatingRequestDto request
    ) {
        return ratingService.createRating(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRating(
            @PathVariable Long id
    ) {
        ratingService.deleteRating(id);
    }
}