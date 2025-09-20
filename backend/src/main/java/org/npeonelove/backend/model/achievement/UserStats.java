package org.npeonelove.backend.model.achievement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.npeonelove.backend.model.resumeEntity.Employee;
import org.npeonelove.backend.model.user.User;

import java.util.UUID;

@Entity
@Table(name = "user_stats")
@Data // Генерирует геттеры, сеттеры, toString, equals, hashCode
@Builder // Позволяет удобно создавать объекты через Achievement.builder()...
@NoArgsConstructor // Генерирует конструктор без аргументов (обязателен для JPA)
@AllArgsConstructor // Генерирует конструктор со всеми аргументами
public class UserStats {

    @Id
    @Column(name = "achievement_id", updatable = false, nullable = false)
    private UUID achievementId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id", nullable = false)
    private Employee employee;

    @Column(name = "progress_bar")
    private Integer progressBar = 0;

    @Column(name = "xp_count")
    private Integer xpCount = 0;

    @Column(name = "my_corner")
    private Boolean myCorner = false;

    @Column(name = "full_gear")
    private Boolean fullGear = false;

    @Column(name = "trailblazer")
    private Boolean trailblazer = false;

    @Column(name = "seasoned_user")
    private Boolean seasonedUser = false;

    @Column(name = "connoisseur")
    private Boolean connoisseur = false;

    @Column(name = "i_live_here")
    private Boolean iLiveHere = false;

    @Column(name = "platform_star") // Предполагается, что в БД default false
    private Boolean platformStar = false;
}
