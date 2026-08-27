package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.FavoriteRequestDto;
import com.lorecraft.lorecraft_backend.dto.FavoriteResponseDto;
import com.lorecraft.lorecraft_backend.service.FavoriteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public List<FavoriteResponseDto> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

    @GetMapping("/{id}")
    public FavoriteResponseDto getFavoriteById(
            @PathVariable Long id
    ) {
        return favoriteService.getFavoriteById(id);
    }

    @GetMapping("/user/{userId}")
    public List<FavoriteResponseDto> getFavoritesByUser(
            @PathVariable Long userId
    ) {
        return favoriteService.getFavoritesByUser(userId);
    }

    @GetMapping("/quest/{questId}")
    public List<FavoriteResponseDto> getFavoritesByQuest(
            @PathVariable Long questId
    ) {
        return favoriteService.getFavoritesByQuest(questId);
    }

    @GetMapping("/user/{userId}/quest/{questId}")
    public FavoriteResponseDto getFavoriteByUserAndQuest(
            @PathVariable Long userId,
            @PathVariable Long questId
    ) {
        return favoriteService.getFavoriteByUserAndQuest(
                userId,
                questId
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FavoriteResponseDto createFavorite(
            @Valid @RequestBody FavoriteRequestDto request
    ) {
        return favoriteService.createFavorite(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFavorite(@PathVariable Long id) {
        favoriteService.deleteFavorite(id);
    }

    @DeleteMapping("/user/{userId}/quest/{questId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFavoriteByUserAndQuest(
            @PathVariable Long userId,
            @PathVariable Long questId
    ) {
        favoriteService.deleteFavoriteByUserAndQuest(
                userId,
                questId
        );
    }
}