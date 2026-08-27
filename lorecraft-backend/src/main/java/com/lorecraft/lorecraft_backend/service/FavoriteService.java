package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.FavoriteMapper;
import com.lorecraft.lorecraft_backend.dto.FavoriteRequestDto;
import com.lorecraft.lorecraft_backend.dto.FavoriteResponseDto;
import com.lorecraft.lorecraft_backend.entity.Favorite;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.entity.User;
import com.lorecraft.lorecraft_backend.repository.FavoriteRepository;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import com.lorecraft.lorecraft_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final QuestRepository questRepository;

    public FavoriteService(
            FavoriteRepository favoriteRepository,
            UserRepository userRepository,
            QuestRepository questRepository
    ) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.questRepository = questRepository;
    }

    public List<FavoriteResponseDto> getAllFavorites() {
        return favoriteRepository.findAll()
                .stream()
                .map(FavoriteMapper::toResponse)
                .toList();
    }

    public FavoriteResponseDto getFavoriteById(Long id) {
        Favorite favorite = favoriteRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Favorite not found with id: " + id
                        )
                );

        return FavoriteMapper.toResponse(favorite);
    }

    public List<FavoriteResponseDto> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserId(userId)
                .stream()
                .map(FavoriteMapper::toResponse)
                .toList();
    }

    public List<FavoriteResponseDto> getFavoritesByQuest(Long questId) {
        return favoriteRepository.findByQuestId(questId)
                .stream()
                .map(FavoriteMapper::toResponse)
                .toList();
    }

    public FavoriteResponseDto getFavoriteByUserAndQuest(
            Long userId,
            Long questId
    ) {
        Favorite favorite = favoriteRepository
                .findByUserIdAndQuestId(userId, questId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Favorite not found for userId: "
                                        + userId
                                        + " and questId: "
                                        + questId
                        )
                );

        return FavoriteMapper.toResponse(favorite);
    }

    public FavoriteResponseDto createFavorite(
            FavoriteRequestDto request
    ) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found with id: "
                                        + request.userId()
                        )
                );

        Quest quest = questRepository.findById(request.questId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: "
                                        + request.questId()
                        )
                );

        if (favoriteRepository.existsByUserIdAndQuestId(
                request.userId(),
                request.questId()
        )) {
            throw new IllegalArgumentException(
                    "Favorite already exists for this user and quest"
            );
        }

        Favorite favorite = new Favorite();

        favorite.setUser(user);
        favorite.setQuest(quest);
        favorite.setAddedAt(LocalDateTime.now());

        Favorite savedFavorite = favoriteRepository.save(favorite);

        return FavoriteMapper.toResponse(savedFavorite);
    }

    public void deleteFavorite(Long id) {
        if (!favoriteRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Favorite not found with id: " + id
            );
        }

        favoriteRepository.deleteById(id);
    }

    public void deleteFavoriteByUserAndQuest(
            Long userId,
            Long questId
    ) {
        Favorite favorite = favoriteRepository
                .findByUserIdAndQuestId(userId, questId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Favorite not found for userId: "
                                        + userId
                                        + " and questId: "
                                        + questId
                        )
                );

        favoriteRepository.delete(favorite);
    }
}