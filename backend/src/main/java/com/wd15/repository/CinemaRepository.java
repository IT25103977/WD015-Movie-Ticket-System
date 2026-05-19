package com.wd15.repository;

import com.wd15.model.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
    Optional<Cinema> findByName(String name);
}
