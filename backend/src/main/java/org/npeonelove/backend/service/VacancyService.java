package org.npeonelove.backend.service;



import lombok.RequiredArgsConstructor;
import org.npeonelove.backend.dto.vacancy.VacancyRequestDTO;
import org.npeonelove.backend.dto.vacancy.VacancyResponseDTO;
import org.npeonelove.backend.exception.BadRequestException;
import org.npeonelove.backend.exception.vacancy.ResourceNotFoundException;
import org.npeonelove.backend.mapper.vacancyMapper.VacancyMapper;
import org.npeonelove.backend.model.vacancyEntity.Vacancy;
import org.npeonelove.backend.repository.VacancyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VacancyService {

    private final VacancyRepository vacancyRepository;
    private final VacancyMapper vacancyMapper;

    // Создать вакансию
    public VacancyResponseDTO create(VacancyRequestDTO dto) {
        validateRequest(dto);
        Vacancy vacancy = vacancyMapper.toEntity(dto);
        Vacancy saved = vacancyRepository.save(vacancy);
        return vacancyMapper.toResponseDTO(saved);
    }

    // Получить все вакансии
    public List<VacancyResponseDTO> getAll() {
        return vacancyMapper.toResponseDTOList(vacancyRepository.findAll());
    }

    // Получить вакансию по id
    public VacancyResponseDTO getById(UUID id) {
        Vacancy vacancy = vacancyRepository.findByUUID(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy with id " + id + " not found"));
        return vacancyMapper.toResponseDTO(vacancy);
    }

    // Обновить вакансию
    public VacancyResponseDTO update(UUID id, VacancyRequestDTO dto) {
        validateRequest(dto);

        Vacancy vacancy = vacancyRepository.findByUUID(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy with id " + id + " not found"));

        Vacancy updated = vacancyMapper.toEntity(dto);
        updated.setId(vacancy.getId()); // сохраняем id

        Vacancy saved = vacancyRepository.save(updated);
        return vacancyMapper.toResponseDTO(saved);
    }

    // Удалить вакансию
    public void delete(UUID id) {
        Vacancy existing = vacancyRepository.findByUUID(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy with id " + id + " not found"));
        vacancyRepository.delete(existing);
    }

    // ==============================
    // Валидация реквеста
    // ==============================
    private void validateRequest(VacancyRequestDTO dto) {
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            throw new BadRequestException("Vacancy title must not be empty");
        }
        if (dto.getEmploymentType() == null || dto.getEmploymentType().isBlank()) {
            throw new BadRequestException("Employment type must be provided");
        }
        if (dto.getCareerLevel() == null || dto.getCareerLevel().isBlank()) {
            throw new BadRequestException("Career level must be provided");
        }
    }
}