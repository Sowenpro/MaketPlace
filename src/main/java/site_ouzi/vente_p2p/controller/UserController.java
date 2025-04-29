package site_ouzi.vente_p2p.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site_ouzi.vente_p2p.DTO.UserDTO;
import site_ouzi.vente_p2p.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDTO loginDTO) {
        try {
            userService.authenticateUser(loginDTO.getLogin(), loginDTO.getPassword());
            return ResponseEntity.ok("Vous ête connecté !");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO registrationDTO) {
        try {
            userService.registerUser(
                    registrationDTO.getLogin(),
                    registrationDTO.getPassword(),
                    registrationDTO.getCity());
            return ResponseEntity.ok("Enregistré avec succès !");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<Boolean> isAdmin(@RequestHeader("login") String login) {
        try {
            boolean isAdmin = userService.isAdmin(login);
            return ResponseEntity.ok(isAdmin);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
    }
}