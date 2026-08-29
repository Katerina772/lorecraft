package com.lorecraft.lorecraft_backend.config;

import com.lorecraft.lorecraft_backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // Для REST API сесії та CSRF нам не потрібні.
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // Auth API — без JWT
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()

                        // Публічні GET-запити для квестів
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/quests",
                                "/api/quests/**"
                        ).permitAll()

                        // Публічні файли
                        .requestMatchers(
                                HttpMethod.GET,
                                "/uploads/**"
                        ).permitAll()

                        // Усі інші запити — тільки після авторизації
                        .anyRequest().authenticated()
                )

                .httpBasic(httpBasic ->
                        httpBasic.disable()
                )

                .formLogin(formLogin ->
                        formLogin.disable()
                )

                .logout(logout ->
                        logout.disable()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}