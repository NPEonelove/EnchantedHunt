package org.npeonelove.backend.controller;


import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.vacancy.VacancyRequestDTO;
import org.npeonelove.backend.dto.vacancy.VacancyResponseDTO;
import org.npeonelove.backend.service.VacancyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/vacancies")
@RequiredArgsConstructor
public class VacancyController {

    private final VacancyService vacancyService;

    // Создать
    @PostMapping
    public ResponseEntity<VacancyResponseDTO> create(@RequestBody VacancyRequestDTO dto) {
        return ResponseEntity.ok(vacancyService.create(dto));
    }

    // Получить все
    @GetMapping
    public ResponseEntity<List<VacancyResponseDTO>> getAll() {
        return ResponseEntity.ok(vacancyService.getAll());
    }

    // Получить по id
    @GetMapping("/{id}")
    public ResponseEntity<VacancyResponseDTO> getById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(vacancyService.getById(id));
    }

    // Обновить
    @PutMapping("/{id}")
    public ResponseEntity<VacancyResponseDTO> update(
            @PathVariable("id") UUID id,
            @RequestBody VacancyRequestDTO dto
    ) {
        return ResponseEntity.ok(vacancyService.update(id, dto));
    }

    // Удалить
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
        vacancyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
