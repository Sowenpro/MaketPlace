package site_ouzi.vente_p2p.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site_ouzi.vente_p2p.entity.ItemForSale;

public interface ItemRepository extends JpaRepository<ItemForSale, Long> {
    List<ItemForSale> findByUserLogin(String login);
}
