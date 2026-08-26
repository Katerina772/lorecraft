package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Rating;
import com.lorecraft.lorecraft_backend.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public Optional<Rating> getUserRating(Long userId, Long questId) {
        return ratingRepository.findByUserIdAndQuestId(userId, questId);
    }

    public List<Rating> getQuestRatings(Long questId) {
        return ratingRepository.findByQuestId(questId);
    }

    public List<Rating> getUserRatings(Long userId) {
        return ratingRepository.findByUserId(userId);
    }

    public Rating saveRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }
}