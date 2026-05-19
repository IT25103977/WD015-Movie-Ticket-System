package com.wd15.service;

import com.wd15.dto.LoginRequest;
import com.wd15.model.User;
import com.wd15.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User register(User user) {
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("Customer");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            user.setPassword("1234");
        }
        if (user.getStatus() == null || user.getStatus().isBlank()) {
            user.setStatus("Active");
        }
        if (user.getJoinedDate() == null || user.getJoinedDate().isBlank()) {
            user.setJoinedDate(java.time.LocalDate.now().toString());
        }
        if (user.getLastLogin() == null || user.getLastLogin().isBlank()) {
            user.setLastLogin("Just now");
        }
        if (user.getAvatar() == null || user.getAvatar().isBlank()) {
            user.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.getName());
        }
        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
                .filter(user -> user.getPassword().equals(request.getPassword()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }

    public User update(Long id, User user) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setRole(user.getRole());
        existing.setPhone(user.getPhone());
        existing.setStatus(user.getStatus());
        existing.setJoinedDate(user.getJoinedDate());
        existing.setLastLogin(user.getLastLogin());
        existing.setAvatar(user.getAvatar());
        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            existing.setPassword(user.getPassword());
        }
        return userRepository.save(existing);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
