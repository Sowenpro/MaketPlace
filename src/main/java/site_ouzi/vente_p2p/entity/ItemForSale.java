package site_ouzi.vente_p2p.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ItemForSale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private boolean isSold = false;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
