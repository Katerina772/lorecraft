package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Choice;
import com.lorecraft.lorecraft_backend.repository.ChoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChoiceService {

    private final ChoiceRepository choiceRepository;

    public ChoiceService(ChoiceRepository choiceRepository) {
        this.choiceRepository = choiceRepository;
    }

    public List<Choice> getChoicesByScene(Long sceneId) {
        return choiceRepository.findBySceneId(sceneId);
    }

    public Optional<Choice> getChoiceById(Long id) {
        return choiceRepository.findById(id);
    }

    public Choice saveChoice(Choice choice) {
        return choiceRepository.save(choice);
    }

    public void deleteChoice(Long id) {
        choiceRepository.deleteById(id);
    }
}