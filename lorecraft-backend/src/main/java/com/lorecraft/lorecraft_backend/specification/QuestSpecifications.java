package com.lorecraft.lorecraft_backend.specification;

import com.lorecraft.lorecraft_backend.entity.Quest;
import org.springframework.data.jpa.domain.Specification;

public final class QuestSpecifications {

    private QuestSpecifications() {
    }

    public static Specification<Quest> titleContains(String query) {

        if (query == null || query.isBlank()) {
            return null;
        }

        String search = query.trim().toLowerCase();

        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        "%" + search + "%"
                );
    }

    public static Specification<Quest> descriptionContains(String query) {

        if (query == null || query.isBlank()) {
            return null;
        }

        String search = query.trim().toLowerCase();

        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("description")),
                        "%" + search + "%"
                );
    }

    public static Specification<Quest> authorEquals(Long authorId) {

        if (authorId == null) {
            return null;
        }

        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("author").get("id"),
                        authorId
                );
    }

    public static Specification<Quest> genreEquals(Long genreId) {

        if (genreId == null) {
            return null;
        }

        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("genre").get("id"),
                        genreId
                );
    }

    public static Specification<Quest> statusEquals(
            Quest.QuestStatus status
    ) {

        if (status == null) {
            return null;
        }

        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("status"),
                        status
                );
    }

    public static Specification<Quest> ageRatingEquals(
            Quest.AgeRating ageRating
    ) {

        if (ageRating == null) {
            return null;
        }

        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("ageRating"),
                        ageRating
                );
    }

    public static Specification<Quest> minimumRating(
            Double minRating
    ) {

        if (minRating == null) {
            return null;
        }

        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(
                        root.get("averageRating"),
                        minRating
                );
    }
}