package org.npeonelove.backend.dto.resume;


import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdditionalEducationDTO {
    private String courseName;
    private String organization;
    private LocalDate issueDate;
}

