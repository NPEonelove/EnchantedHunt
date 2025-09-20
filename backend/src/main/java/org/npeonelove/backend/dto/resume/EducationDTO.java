package org.npeonelove.backend.dto.resume;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationDTO {
    private String institution;
    private String degree;
    private String specialization;
    private Integer graduationYear;
}

