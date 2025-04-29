package site_ouzi.vente_p2p;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@SpringBootApplication
@EntityScan(basePackages = "site_ouzi.vente_p2p.entity")
public class SiteVenteApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiteVenteApplication.class, args);
	}

}
