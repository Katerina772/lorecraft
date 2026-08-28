package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.MediaMapper;
import com.lorecraft.lorecraft_backend.dto.MediaRequestDto;
import com.lorecraft.lorecraft_backend.dto.MediaResponseDto;
import com.lorecraft.lorecraft_backend.entity.Media;
import com.lorecraft.lorecraft_backend.entity.User;
import com.lorecraft.lorecraft_backend.repository.MediaRepository;
import com.lorecraft.lorecraft_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class MediaService {

    private final MediaRepository mediaRepository;
    private final UserRepository userRepository;

    public MediaService(
            MediaRepository mediaRepository,
            UserRepository userRepository
    ) {
        this.mediaRepository = mediaRepository;
        this.userRepository = userRepository;
    }

    public List<MediaResponseDto> getAllMedia() {
        return mediaRepository.findAll()
                .stream()
                .map(MediaMapper::toResponse)
                .toList();
    }

    public MediaResponseDto getMediaById(Long id) {
        Media media = mediaRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Media not found with id: " + id
                        )
                );

        return MediaMapper.toResponse(media);
    }

    public List<MediaResponseDto> getMediaByOwner(Long ownerId) {
        return mediaRepository.findByOwnerId(ownerId)
                .stream()
                .map(MediaMapper::toResponse)
                .toList();
    }

    public List<MediaResponseDto> getMediaByOwnerAndType(
            Long ownerId,
            Media.MediaType mediaType
    ) {
        return mediaRepository
                .findByOwnerIdAndMediaType(ownerId, mediaType)
                .stream()
                .map(MediaMapper::toResponse)
                .toList();
    }

    public MediaResponseDto createMedia(
            MediaRequestDto request
    ) {
        User owner = userRepository.findById(request.ownerId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found with id: "
                                        + request.ownerId()
                        )
                );

        Media media = new Media();

        media.setOwner(owner);
        media.setFileName(request.fileName());
        media.setFilePath(request.filePath());
        media.setMediaType(request.mediaType());
        media.setPublicMedia(
                request.publicMedia() != null
                        && request.publicMedia()
        );
        media.setUploadedAt(LocalDateTime.now());

        Media savedMedia = mediaRepository.save(media);

        return MediaMapper.toResponse(savedMedia);
    }

    public void deleteMedia(Long id) {
        if (!mediaRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Media not found with id: " + id
            );
        }

        mediaRepository.deleteById(id);
    }
}