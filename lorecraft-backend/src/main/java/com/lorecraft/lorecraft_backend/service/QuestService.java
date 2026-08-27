package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.QuestMapper;
import com.lorecraft.lorecraft_backend.dto.QuestRequestDto;
import com.lorecraft.lorecraft_backend.dto.QuestResponseDto;
import com.lorecraft.lorecraft_backend.entity.Genre;
import com.lorecraft.lorecraft_backend.entity.Media;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.entity.User;
import com.lorecraft.lorecraft_backend.repository.GenreRepository;
import com.lorecraft.lorecraft_backend.repository.MediaRepository;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import com.lorecraft.lorecraft_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class QuestService {

    private final QuestRepository questRepository;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final MediaRepository mediaRepository;

    public QuestService(
            QuestRepository questRepository,
            UserRepository userRepository,
            GenreRepository genreRepository,
            MediaRepository mediaRepository
    ) {
        this.questRepository = questRepository;
        this.userRepository = userRepository;
        this.genreRepository = genreRepository;
        this.mediaRepository = mediaRepository;
    }

    public List<QuestResponseDto> getAllQuests() {
        return questRepository.findAll()
                .stream()
                .map(QuestMapper::toResponse)
                .toList();
    }

    public QuestResponseDto getQuestById(Long id) {
        Quest quest = questRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: " + id
                        )
                );

        return QuestMapper.toResponse(quest);
    }

    public List<QuestResponseDto> getQuestsByAuthor(Long authorId) {
        return questRepository.findByAuthorId(authorId)
                .stream()
                .map(QuestMapper::toResponse)
                .toList();
    }

    public List<QuestResponseDto> getQuestsByGenre(Long genreId) {
        return questRepository.findByGenreId(genreId)
                .stream()
                .map(QuestMapper::toResponse)
                .toList();
    }

    public List<QuestResponseDto> getQuestsByStatus(
            Quest.QuestStatus status
    ) {
        return questRepository.findByStatus(status)
                .stream()
                .map(QuestMapper::toResponse)
                .toList();
    }

    public QuestResponseDto createQuest(
            QuestRequestDto request,
            Long authorId
    ) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Author not found with id: " + authorId
                        )
                );

        Genre genre = genreRepository.findById(request.genreId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Genre not found with id: " + request.genreId()
                        )
                );

        Media coverMedia = null;

        if (request.coverMediaId() != null) {
            coverMedia = mediaRepository.findById(
                    request.coverMediaId()
            ).orElseThrow(() ->
                    new IllegalArgumentException(
                            "Cover media not found with id: "
                                    + request.coverMediaId()
                    )
            );
        }

        Quest quest = new Quest();

        quest.setAuthor(author);
        quest.setGenre(genre);
        quest.setTitle(request.title());
        quest.setDescription(request.description());
        quest.setCoverMedia(coverMedia);

        quest.setAgeRating(
                parseAgeRating(request.ageRating())
        );

        quest.setStatus(Quest.QuestStatus.DRAFT);
        quest.setAverageRating(BigDecimal.ZERO);
        quest.setPlayCount(0);

        LocalDateTime now = LocalDateTime.now();
        quest.setCreatedAt(now);
        quest.setUpdatedAt(now);

        Quest savedQuest = questRepository.save(quest);

        return QuestMapper.toResponse(savedQuest);
    }

    public QuestResponseDto updateQuest(
            Long id,
            QuestRequestDto request
    ) {
        Quest quest = questRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: " + id
                        )
                );

        Genre genre = genreRepository.findById(request.genreId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Genre not found with id: "
                                        + request.genreId()
                        )
                );

        Media coverMedia = null;

        if (request.coverMediaId() != null) {
            coverMedia = mediaRepository.findById(
                    request.coverMediaId()
            ).orElseThrow(() ->
                    new IllegalArgumentException(
                            "Cover media not found with id: "
                                    + request.coverMediaId()
                    )
            );
        }

        quest.setGenre(genre);
        quest.setTitle(request.title());
        quest.setDescription(request.description());
        quest.setCoverMedia(coverMedia);
        quest.setAgeRating(
                parseAgeRating(request.ageRating())
        );
        quest.setUpdatedAt(LocalDateTime.now());

        Quest updatedQuest = questRepository.save(quest);

        return QuestMapper.toResponse(updatedQuest);
    }

    public void deleteQuest(Long id) {
        if (!questRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Quest not found with id: " + id
            );
        }

        questRepository.deleteById(id);
    }

    private Quest.AgeRating parseAgeRating(String ageRating) {

        if (ageRating == null) {
            throw new IllegalArgumentException(
                    "Age rating is required"
            );
        }

        return switch (ageRating) {
            case "6+" -> Quest.AgeRating.AGE_6;
            case "12+" -> Quest.AgeRating.AGE_12;
            case "16+" -> Quest.AgeRating.AGE_16;
            case "18+" -> Quest.AgeRating.AGE_18;
            default -> throw new IllegalArgumentException(
                    "Invalid age rating: " + ageRating
            );
        };
    }
}