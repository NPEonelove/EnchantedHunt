package org.npeonelove.backend.dto.resume;


import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkExperienceDTO {
    private String companyName;
    private String role;
    private LocalDate startDate;
    private LocalDate endDate;
    private String responsibilities;
}
