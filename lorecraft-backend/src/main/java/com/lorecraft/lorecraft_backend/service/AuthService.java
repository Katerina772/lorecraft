package com.lorecraft.lorecraft_backend.service;

import com.lorecraft.lorecraft_backend.dto.LoginRequestDto;
import com.lorecraft.lorecraft_backend.dto.LoginResponseDto;
import com.lorecraft.lorecraft_backend.dto.RegisterRequestDto;
import com.lorecraft.lorecraft_backend.dto.UserMapper;
import com.lorecraft.lorecraft_backend.dto.UserResponseDto;
import com.lorecraft.lorecraft_backend.entity.User;
import com.lorecraft.lorecraft_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDto register(RegisterRequestDto request) {

        if (userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException(
                    "Username is already taken"
            );
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException(
                    "Email is already registered"
            );
        }

        User user = new User();

        user.setUsername(request.username());
        user.setEmail(request.email());

        // Зберігаємо тільки хеш пароля.
        user.setPasswordHash(
                passwordEncoder.encode(request.password())
        );

        user.setBirthDate(request.birthDate());
        user.setRole(User.UserRole.USER);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }

    public LoginResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByUsername(request.login())
                .orElseGet(() ->
                        userRepository.findByEmail(request.login())
                                .orElseThrow(() ->
                                        new IllegalArgumentException(
                                                "Invalid username/email or password"
                                        )
                                )
                );

        if (!user.isActive()) {
            throw new IllegalArgumentException(
                    "User account is inactive"
            );
        }

        if (!passwordEncoder.matches(
                request.password(),
                user.getPasswordHash()
        )) {
            throw new IllegalArgumentException(
                    "Invalid username/email or password"
            );
        }

        user.setLastLogin(LocalDateTime.now());

        User updatedUser = userRepository.save(user);

        return new LoginResponseDto(
                "Login successful",
                UserMapper.toResponse(updatedUser)
        );
    }
}