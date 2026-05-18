package com.wd15.controller;

import com.wd15.model.TimeSlot;
import com.wd15.repository.TimeSlotRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/times")
public class TimeSlotController {
    private final TimeSlotRepository timeSlotRepository;

    public TimeSlotController(TimeSlotRepository timeSlotRepository) {
        this.timeSlotRepository = timeSlotRepository;
    }

    @GetMapping
    public List<TimeSlot> getTimes() {
        return timeSlotRepository.findAll();
    }

    @PostMapping
    public TimeSlot create(@RequestBody TimeSlot timeSlot) {
        return timeSlotRepository.save(timeSlot);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        timeSlotRepository.deleteById(id);
    }
}
