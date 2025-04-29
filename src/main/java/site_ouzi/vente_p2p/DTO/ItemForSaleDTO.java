package site_ouzi.vente_p2p.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ItemForSaleDTO {
    private String description;
    private BigDecimal price;
}
