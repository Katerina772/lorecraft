package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.MediaRequestDto;
import com.lorecraft.lorecraft_backend.dto.MediaResponseDto;
import com.lorecraft.lorecraft_backend.entity.Media;
import com.lorecraft.lorecraft_backend.service.MediaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping
    public List<MediaResponseDto> getAllMedia() {
        return mediaService.getAllMedia();
    }

    @GetMapping("/{id}")
    public MediaResponseDto getMediaById(
            @PathVariable Long id
    ) {
        return mediaService.getMediaById(id);
    }

    @GetMapping("/owner/{ownerId}")
    public List<MediaResponseDto> getMediaByOwner(
            @PathVariable Long ownerId
    ) {
        return mediaService.getMediaByOwner(ownerId);
    }

    @GetMapping("/owner/{ownerId}/type/{mediaType}")
    public List<MediaResponseDto> getMediaByOwnerAndType(
            @PathVariable Long ownerId,
            @PathVariable Media.MediaType mediaType
    ) {
        return mediaService.getMediaByOwnerAndType(
                ownerId,
                mediaType
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MediaResponseDto createMedia(
            @Valid @RequestBody MediaRequestDto request
    ) {
        return mediaService.createMedia(request);
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public MediaResponseDto uploadMedia(
            @RequestParam Long ownerId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false)
            Boolean publicMedia
    ) {
        return mediaService.uploadMedia(
                ownerId,
                file,
                publicMedia
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMedia(
            @PathVariable Long id
    ) {
        mediaService.deleteMedia(id);
    }
}