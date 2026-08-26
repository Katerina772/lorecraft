package com.lorecraft.lorecraft_backend.controller;

import com.lorecraft.lorecraft_backend.dto.LoginRequestDto;
import com.lorecraft.lorecraft_backend.dto.LoginResponseDto;
import com.lorecraft.lorecraft_backend.dto.RegisterRequestDto;
import com.lorecraft.lorecraft_backend.dto.UserResponseDto;
import com.lorecraft.lorecraft_backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDto register(
            @Valid @RequestBody RegisterRequestDto request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponseDto login(
            @Valid @RequestBody LoginRequestDto request
    ) {
        return authService.login(request);
    }
}