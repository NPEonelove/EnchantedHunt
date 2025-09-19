package org.npeonelove.backend.entity.vacancyEntity;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class Salary {
    private Double min;
    private Double max;
    private String currency;
}
