package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.ChoiceFullDto;
import com.lorecraft.lorecraft_backend.dto.QuestFullResponseDto;
import com.lorecraft.lorecraft_backend.dto.QuestMapper;
import com.lorecraft.lorecraft_backend.dto.QuestMetaDto;
import com.lorecraft.lorecraft_backend.dto.QuestRequestDto;
import com.lorecraft.lorecraft_backend.dto.QuestResponseDto;
import com.lorecraft.lorecraft_backend.dto.QuestStatisticsResponseDto;
import com.lorecraft.lorecraft_backend.dto.SceneFullDto;
import com.lorecraft.lorecraft_backend.entity.Genre;
import com.lorecraft.lorecraft_backend.entity.Media;
import com.lorecraft.lorecraft_backend.entity.Quest;
import com.lorecraft.lorecraft_backend.entity.User;
import com.lorecraft.lorecraft_backend.repository.ChoiceRepository;
import com.lorecraft.lorecraft_backend.repository.GenreRepository;
import com.lorecraft.lorecraft_backend.repository.MediaRepository;
import com.lorecraft.lorecraft_backend.repository.ProgressRepository;
import com.lorecraft.lorecraft_backend.repository.QuestRepository;
import com.lorecraft.lorecraft_backend.repository.RatingRepository;
import com.lorecraft.lorecraft_backend.repository.SceneRepository;
import com.lorecraft.lorecraft_backend.repository.UserRepository;
import com.lorecraft.lorecraft_backend.specification.QuestSpecifications;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
    private final SceneRepository sceneRepository;
    private final ChoiceRepository choiceRepository;
    private final RatingRepository ratingRepository;
    private final ProgressRepository progressRepository;

    public QuestService(
            QuestRepository questRepository,
            UserRepository userRepository,
            GenreRepository genreRepository,
            MediaRepository mediaRepository,
            SceneRepository sceneRepository,
            ChoiceRepository choiceRepository,
            RatingRepository ratingRepository,
            ProgressRepository progressRepository
    ) {
        this.questRepository = questRepository;
        this.userRepository = userRepository;
        this.genreRepository = genreRepository;
        this.mediaRepository = mediaRepository;
        this.sceneRepository = sceneRepository;
        this.choiceRepository = choiceRepository;
        this.ratingRepository = ratingRepository;
        this.progressRepository = progressRepository;
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

    public QuestFullResponseDto getFullQuest(Long questId) {

        Quest quest = questRepository.findById(questId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: " + questId
                        )
                );

        QuestMetaDto meta = new QuestMetaDto(
                quest.getId(),
                quest.getTitle(),
                quest.getDescription(),
                quest.getGenre() != null
                        ? quest.getGenre().getId()
                        : null,
                quest.getAgeRating() != null
                        ? quest.getAgeRating().toString()
                        : null,
                quest.getCoverMedia() != null
                        ? quest.getCoverMedia().getId()
                        : null,
                quest.getStatus() != null
                        ? quest.getStatus().name()
                        : null,
                quest.getAverageRating() != null
                        ? quest.getAverageRating().doubleValue()
                        : 0.0,
                quest.getPlayCount()
        );

        List<SceneFullDto> scenes = sceneRepository
                .findByQuestIdOrderByOrderNumberAsc(questId)
                .stream()
                .map(scene -> {

                    List<ChoiceFullDto> choices =
                            choiceRepository
                                    .findBySceneId(scene.getId())
                                    .stream()
                                    .map(choice ->
                                            new ChoiceFullDto(
                                                    choice.getId(),
                                                    choice.getText(),
                                                    choice.getNextScene() != null
                                                            ? choice.getNextScene().getId()
                                                            : null
                                            )
                                    )
                                    .toList();

                    return new SceneFullDto(
                            scene.getId(),
                            scene.getTitle(),
                            scene.getText(),
                            scene.getBackgroundMedia() != null
                                    ? scene.getBackgroundMedia().getId()
                                    : null,
                            scene.getCharacterName(),
                            scene.getCharacterMedia() != null
                                    ? scene.getCharacterMedia().getId()
                                    : null,
                            scene.getAudioMedia() != null
                                    ? scene.getAudioMedia().getId()
                                    : null,
                            scene.getOrderNumber(),
                            scene.isEnding(),
                            scene.getEndingType() != null
                                    ? scene.getEndingType().name()
                                    : null,
                            choices
                    );
                })
                .toList();

        return new QuestFullResponseDto(
                meta,
                scenes
        );
    }

    public List<QuestResponseDto> searchQuests(
            String query,
            Long authorId,
            Long genreId,
            Quest.QuestStatus status,
            Quest.AgeRating ageRating,
            Double minRating,
            String sort
    ) {

        Specification<Quest> specification =
                (root, criteriaQuery, criteriaBuilder) ->
                        criteriaBuilder.conjunction();

        Specification<Quest> titleSpecification =
                QuestSpecifications.titleContains(query);

        if (titleSpecification != null) {
            specification = specification.and(titleSpecification);
        }

        Specification<Quest> descriptionSpecification =
                QuestSpecifications.descriptionContains(query);

        if (descriptionSpecification != null) {
            specification = specification.and(descriptionSpecification);
        }

        Specification<Quest> authorSpecification =
                QuestSpecifications.authorEquals(authorId);

        if (authorSpecification != null) {
            specification = specification.and(authorSpecification);
        }

        Specification<Quest> genreSpecification =
                QuestSpecifications.genreEquals(genreId);

        if (genreSpecification != null) {
            specification = specification.and(genreSpecification);
        }

        Specification<Quest> statusSpecification =
                QuestSpecifications.statusEquals(status);

        if (statusSpecification != null) {
            specification = specification.and(statusSpecification);
        }

        Specification<Quest> ageRatingSpecification =
                QuestSpecifications.ageRatingEquals(ageRating);

        if (ageRatingSpecification != null) {
            specification = specification.and(ageRatingSpecification);
        }

        Specification<Quest> minimumRatingSpecification =
                QuestSpecifications.minimumRating(minRating);

        if (minimumRatingSpecification != null) {
            specification = specification.and(
                    minimumRatingSpecification
            );
        }

        Sort sorting = switch (sort == null ? "" : sort) {

            case "rating_asc" ->
                    Sort.by(
                            Sort.Direction.ASC,
                            "averageRating"
                    );

            case "rating_desc" ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "averageRating"
                    );

            case "plays_asc" ->
                    Sort.by(
                            Sort.Direction.ASC,
                            "playCount"
                    );

            case "plays_desc" ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "playCount"
                    );

            case "newest" ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "createdAt"
                    );

            case "oldest" ->
                    Sort.by(
                            Sort.Direction.ASC,
                            "createdAt"
                    );

            case "title_asc" ->
                    Sort.by(
                            Sort.Direction.ASC,
                            "title"
                    );

            case "title_desc" ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "title"
                    );

            default ->
                    Sort.by(
                            Sort.Direction.DESC,
                            "createdAt"
                    );
        };

        return questRepository
                .findAll(specification, sorting)
                .stream()
                .map(QuestMapper::toResponse)
                .toList();
    }

    public QuestStatisticsResponseDto getQuestStatistics(
            Long questId
    ) {

        Quest quest = questRepository.findById(questId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: " + questId
                        )
                );

        long ratingCount =
                ratingRepository.countByQuestId(questId);

        long completedCount =
                progressRepository
                        .countByQuestIdAndCompletedTrue(questId);

        double averageRating =
                quest.getAverageRating() != null
                        ? quest.getAverageRating().doubleValue()
                        : 0.0;

        return new QuestStatisticsResponseDto(
                quest.getId(),
                quest.getPlayCount(),
                averageRating,
                ratingCount,
                completedCount
        );
    }

    public QuestResponseDto publishQuest(Long id) {

        Quest quest = questRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: " + id
                        )
                );

        quest.setStatus(Quest.QuestStatus.PUBLISHED);
        quest.setUpdatedAt(LocalDateTime.now());

        Quest updatedQuest = questRepository.save(quest);

        return QuestMapper.toResponse(updatedQuest);
    }

    public QuestResponseDto unpublishQuest(Long id) {

        Quest quest = questRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Quest not found with id: " + id
                        )
                );

        quest.setStatus(Quest.QuestStatus.DRAFT);
        quest.setUpdatedAt(LocalDateTime.now());

        Quest updatedQuest = questRepository.save(quest);

        return QuestMapper.toResponse(updatedQuest);
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