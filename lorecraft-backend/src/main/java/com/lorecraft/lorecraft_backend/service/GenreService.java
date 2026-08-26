package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.entity.Genre;
import com.lorecraft.lorecraft_backend.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Optional<Genre> getGenreById(Long id) {
        return genreRepository.findById(id);
    }

    public Optional<Genre> getGenreByName(String name) {
        return genreRepository.findByName(name);
    }

    public Genre saveGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public boolean existsByName(String name) {
        return genreRepository.existsByName(name);
    }

    public void deleteGenre(Long id) {
        genreRepository.deleteById(id);
    }
}