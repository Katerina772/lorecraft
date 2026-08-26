package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Favorite;
import com.lorecraft.lorecraft_backend.repository.FavoriteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public Optional<Favorite> getFavorite(Long userId, Long questId) {
        return favoriteRepository.findByUserIdAndQuestId(userId, questId);
    }

    public List<Favorite> getUserFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public boolean isFavorite(Long userId, Long questId) {
        return favoriteRepository.existsByUserIdAndQuestId(userId, questId);
    }

    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public void deleteFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }
}