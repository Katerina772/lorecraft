package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.RatingMapper;
import com.lorecraft.lorecraft_backend.dto.RatingRequestDto;
import com.lorecraft.lorecraft_backend.dto.RatingResponseDto;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.entity.Rating;
import com.lorecraft.lorecraft_backend.entity.User;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import com.lorecraft.lorecraft_backend.repository.RatingRepository;
import com.lorecraft.lorecraft_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final QuestRepository questRepository;

    public RatingService(
            RatingRepository ratingRepository,
            UserRepository userRepository,
            QuestRepository questRepository
    ) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
        this.questRepository = questRepository;
    }

    public List<RatingResponseDto> getAllRatings() {
        return ratingRepository.findAll()
                .stream()
                .map(RatingMapper::toResponse)
                .toList();
    }

    public RatingResponseDto getRatingById(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Rating not found with id: " + id
                        )
                );

        return RatingMapper.toResponse(rating);
    }

    public List<RatingResponseDto> getRatingsByUser(Long userId) {
        return ratingRepository.findByUserId(userId)
                .stream()
                .map(RatingMapper::toResponse)
                .toList();
    }

    public List<RatingResponseDto> getRatingsByQuest(Long questId) {
        return ratingRepository.findByQuestId(questId)
                .stream()
                .map(RatingMapper::toResponse)
                .toList();
    }

    public RatingResponseDto getRatingByUserAndQuest(
            Long userId,
            Long questId
    ) {
        Rating rating = ratingRepository
                .findByUserIdAndQuestId(userId, questId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Rating not found for userId: "
                                        + userId
                                        + " and questId: "
                                        + questId
                        )
                );

        return RatingMapper.toResponse(rating);
    }

    public RatingResponseDto createRating(
            RatingRequestDto request
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

        if (request.rating() < 1 || request.rating() > 5) {
            throw new IllegalArgumentException(
                    "Rating must be between 1 and 5"
            );
        }

        if (ratingRepository.findByUserIdAndQuestId(
                request.userId(),
                request.questId()
        ).isPresent()) {
            throw new IllegalArgumentException(
                    "Rating already exists for this user and quest"
            );
        }

        Rating rating = new Rating();

        rating.setUser(user);
        rating.setQuest(quest);
        rating.setRating(request.rating());
        rating.setCreatedAt(LocalDateTime.now());

        Rating savedRating = ratingRepository.save(rating);

        updateQuestAverageRating(quest);

        return RatingMapper.toResponse(savedRating);
    }

    public void deleteRating(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Rating not found with id: " + id
                        )
                );

        Quest quest = rating.getQuest();

        ratingRepository.delete(rating);

        updateQuestAverageRating(quest);
    }

    private void updateQuestAverageRating(Quest quest) {

        BigDecimal averageRating =
                ratingRepository.calculateAverageRating(quest.getId());

        if (averageRating == null) {
            averageRating = BigDecimal.ZERO;
        }

        quest.setAverageRating(
                averageRating.setScale(
                        2,
                        java.math.RoundingMode.HALF_UP
                )
        );

        questRepository.save(quest);
    }
}