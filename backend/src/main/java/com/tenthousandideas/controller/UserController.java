package com.tenthousandideas.controller;

import com.tenthousandideas.entity.User;
import com.tenthousandideas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            User user = new User();
            user.setEmail(request.get("email"));
            user.setPassword(request.get("password"));
            user.setFullName(request.get("fullName"));
            user.setPhone(request.get("phone"));
            
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User registered successfully",
                "userId", registeredUser.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        
        Optional<User> user = userService.loginUser(email, password);
        
        if (user.isPresent()) {
            User loggedInUser = user.get();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "user", Map.of(
                    "id", loggedInUser.getId(),
                    "email", loggedInUser.getEmail(),
                    "fullName", loggedInUser.getFullName(),
                    "phone", loggedInUser.getPhone()
                )
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid email or password"
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        
        if (user.isPresent()) {
            User foundUser = user.get();
            return ResponseEntity.ok(Map.of(
                "id", foundUser.getId(),
                "email", foundUser.getEmail(),
                "fullName", foundUser.getFullName(),
                "phone", foundUser.getPhone(),
                "bio", foundUser.getBio()
            ));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}