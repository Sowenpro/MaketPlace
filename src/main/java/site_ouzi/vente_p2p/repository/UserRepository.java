package site_ouzi.vente_p2p.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site_ouzi.vente_p2p.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByLogin(String login);

    User findByLogin(String login);
}
