package com.wd15.controller;

import com.wd15.dto.BookingRequest;
import com.wd15.model.Booking;
import com.wd15.service.BookingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    //declaring attributes
    private final BookingService bookingService;

    //parameterized constructor
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<Booking> getBookings() {
        return bookingService.findAll();
    }

    @PostMapping
    public Booking create(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllBookings() {
        bookingService.deleteAllBookings();
        return ResponseEntity.ok("All bookings deleted successfully");
    }
}
