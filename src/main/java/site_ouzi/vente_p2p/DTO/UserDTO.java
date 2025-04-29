package site_ouzi.vente_p2p.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDTO {
    @NotBlank
    private String login;

    @NotBlank
    private String password;

    @NotBlank
    private String city;
}
