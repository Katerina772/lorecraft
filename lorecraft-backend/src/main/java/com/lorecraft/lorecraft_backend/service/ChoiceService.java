package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.ChoiceMapper;
import com.lorecraft.lorecraft_backend.dto.ChoiceRequestDto;
import com.lorecraft.lorecraft_backend.dto.ChoiceResponseDto;
import com.lorecraft.lorecraft_backend.entity.Choice;
import com.lorecraft.lorecraft_backend.entity.Scene;
import com.lorecraft.lorecraft_backend.repository.ChoiceRepository;
import com.lorecraft.lorecraft_backend.repository.SceneRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChoiceService {

    private final ChoiceRepository choiceRepository;
    private final SceneRepository sceneRepository;

    public ChoiceService(
            ChoiceRepository choiceRepository,
            SceneRepository sceneRepository
    ) {
        this.choiceRepository = choiceRepository;
        this.sceneRepository = sceneRepository;
    }

    public List<ChoiceResponseDto> getAllChoices() {
        return choiceRepository.findAll()
                .stream()
                .map(ChoiceMapper::toResponse)
                .toList();
    }

    public ChoiceResponseDto getChoiceById(Long id) {
        Choice choice = choiceRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Choice not found with id: " + id
                        )
                );

        return ChoiceMapper.toResponse(choice);
    }

    public List<ChoiceResponseDto> getChoicesByScene(Long sceneId) {
        return choiceRepository.findBySceneId(sceneId)
                .stream()
                .map(ChoiceMapper::toResponse)
                .toList();
    }

    public ChoiceResponseDto createChoice(ChoiceRequestDto request) {

        Scene scene = sceneRepository.findById(request.sceneId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Scene not found with id: " + request.sceneId()
                        )
                );

        Scene nextScene = sceneRepository.findById(request.nextSceneId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Next scene not found with id: "
                                        + request.nextSceneId()
                        )
                );

        Choice choice = new Choice();

        choice.setScene(scene);
        choice.setText(request.text());
        choice.setNextScene(nextScene);

        Choice savedChoice = choiceRepository.save(choice);

        return ChoiceMapper.toResponse(savedChoice);
    }

    public ChoiceResponseDto updateChoice(
            Long id,
            ChoiceRequestDto request
    ) {
        Choice choice = choiceRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Choice not found with id: " + id
                        )
                );

        Scene scene = sceneRepository.findById(request.sceneId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Scene not found with id: " + request.sceneId()
                        )
                );

        Scene nextScene = sceneRepository.findById(request.nextSceneId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Next scene not found with id: "
                                        + request.nextSceneId()
                        )
                );

        choice.setScene(scene);
        choice.setText(request.text());
        choice.setNextScene(nextScene);

        Choice updatedChoice = choiceRepository.save(choice);

        return ChoiceMapper.toResponse(updatedChoice);
    }

    public void deleteChoice(Long id) {
        if (!choiceRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Choice not found with id: " + id
            );
        }

        choiceRepository.deleteById(id);
    }
}