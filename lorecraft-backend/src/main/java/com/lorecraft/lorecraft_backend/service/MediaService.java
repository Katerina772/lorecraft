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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class MediaService {

    private final MediaRepository mediaRepository;
    private final UserRepository userRepository;

    private final Path uploadRoot =
            Paths.get("uploads").toAbsolutePath().normalize();

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

    public MediaResponseDto uploadMedia(
            Long ownerId,
            MultipartFile file,
            Boolean publicMedia
    ) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "File is required"
            );
        }

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found with id: " + ownerId
                        )
                );

        Media.MediaType mediaType =
                determineMediaType(file);

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null
                || originalFileName.isBlank()) {
            throw new IllegalArgumentException(
                    "File name is required"
            );
        }

        String cleanFileName = Paths
                .get(originalFileName)
                .getFileName()
                .toString();

        String extension = getExtension(cleanFileName);

        String storedFileName =
                UUID.randomUUID()
                        + extension;

        String folderName =
                mediaType == Media.MediaType.IMAGE
                        ? "images"
                        : "audio";

        Path uploadDirectory =
                uploadRoot.resolve(folderName).normalize();

        try {
            Files.createDirectories(uploadDirectory);

            Path targetPath =
                    uploadDirectory
                            .resolve(storedFileName)
                            .normalize();

            if (!targetPath.startsWith(uploadDirectory)) {
                throw new IllegalArgumentException(
                        "Invalid file path"
                );
            }

            Files.copy(
                    file.getInputStream(),
                    targetPath,
                    StandardCopyOption.REPLACE_EXISTING
            );

        } catch (IOException exception) {
            throw new IllegalStateException(
                    "Failed to save uploaded file",
                    exception
            );
        }

        Media media = new Media();

        media.setOwner(owner);
        media.setFileName(cleanFileName);
        media.setFilePath(
                "/uploads/"
                        + folderName
                        + "/"
                        + storedFileName
        );
        media.setMediaType(mediaType);
        media.setPublicMedia(
                publicMedia != null && publicMedia
        );
        media.setUploadedAt(LocalDateTime.now());

        Media savedMedia = mediaRepository.save(media);

        return MediaMapper.toResponse(savedMedia);
    }

    public void deleteMedia(Long id) {

        Media media = mediaRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Media not found with id: " + id
                        )
                );

        String filePath = media.getFilePath();

        if (filePath != null
                && filePath.startsWith("/uploads/")) {

            String relativePath =
                    filePath.substring("/uploads/".length());

            Path file =
                    uploadRoot
                            .resolve(relativePath)
                            .normalize();

            if (file.startsWith(uploadRoot)) {
                try {
                    Files.deleteIfExists(file);
                } catch (IOException exception) {
                    throw new IllegalStateException(
                            "Failed to delete physical media file",
                            exception
                    );
                }
            }
        }

        mediaRepository.delete(media);
    }

    private Media.MediaType determineMediaType(
            MultipartFile file
    ) {

        String contentType = file.getContentType();

        if (contentType != null) {

            if (contentType.startsWith("image/")) {
                return Media.MediaType.IMAGE;
            }

            if (contentType.startsWith("audio/")) {
                return Media.MediaType.AUDIO;
            }
        }

        String fileName = file.getOriginalFilename();

        String extension =
                getExtension(fileName)
                        .toLowerCase();

        if (isImageExtension(extension)) {
            return Media.MediaType.IMAGE;
        }

        if (isAudioExtension(extension)) {
            return Media.MediaType.AUDIO;
        }

        throw new IllegalArgumentException(
                "Unsupported media type. Only images and audio files are allowed"
        );
    }

    private String getExtension(String fileName) {

        if (fileName == null) {
            return "";
        }

        int dotIndex = fileName.lastIndexOf('.');

        if (dotIndex < 0) {
            return "";
        }

        return fileName.substring(dotIndex);
    }

    private boolean isImageExtension(
            String extension
    ) {
        return extension.equals(".jpg")
                || extension.equals(".jpeg")
                || extension.equals(".png")
                || extension.equals(".gif")
                || extension.equals(".webp");
    }

    private boolean isAudioExtension(
            String extension
    ) {
        return extension.equals(".mp3")
                || extension.equals(".wav")
                || extension.equals(".ogg")
                || extension.equals(".m4a")
                || extension.equals(".aac");
    }
}