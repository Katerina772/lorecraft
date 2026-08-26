package com.lorecraft.lorecraft_backend.repository;

import com.lorecraft.lorecraft_backend.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {

    List<Choice> findBySceneId(Long sceneId);
}