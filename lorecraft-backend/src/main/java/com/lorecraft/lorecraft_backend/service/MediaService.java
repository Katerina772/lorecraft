package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Media;
import com.lorecraft.lorecraft_backend.repository.MediaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    public Optional<Media> getMediaById(Long id) {
        return mediaRepository.findById(id);
    }

    public List<Media> getMediaByOwner(Long ownerId) {
        return mediaRepository.findByOwnerId(ownerId);
    }

    public List<Media> getMediaByOwnerAndType(
            Long ownerId,
            Media.MediaType mediaType
    ) {
        return mediaRepository.findByOwnerIdAndMediaType(
                ownerId,
                mediaType
        );
    }

    public Media saveMedia(Media media) {
        return mediaRepository.save(media);
    }

    public void deleteMedia(Long id) {
        mediaRepository.deleteById(id);
    }
}