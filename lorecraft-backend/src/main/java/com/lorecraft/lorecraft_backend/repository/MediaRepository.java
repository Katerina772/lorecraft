package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {

    List<Media> findByOwnerId(Long ownerId);

    List<Media> findByOwnerIdAndMediaType(
            Long ownerId,
            Media.MediaType mediaType
    );
}