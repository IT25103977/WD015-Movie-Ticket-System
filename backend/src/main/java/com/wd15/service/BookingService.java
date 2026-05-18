package com.wd15.service;

import com.wd15.dto.BookingRequest;
import com.wd15.model.Booking;
import com.wd15.model.Cinema;
import com.wd15.model.FoodItem;
import com.wd15.model.Payment;
import com.wd15.model.Show;
import com.wd15.model.User;
import com.wd15.repository.BookingRepository;
import com.wd15.repository.CinemaRepository;
import com.wd15.repository.FoodItemRepository;
import com.wd15.repository.MovieRepository;
import com.wd15.repository.ShowRepository;
import com.wd15.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {

    //declaring attributes
    private final BookingRepository bookingRepository;
    private final ShowRepository showRepository;
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;
    private final UserRepository userRepository;
    private final FoodItemRepository foodItemRepository;

    //parameterized constructor
    public BookingService(BookingRepository bookingRepository, ShowRepository showRepository,
                          UserRepository userRepository, FoodItemRepository foodItemRepository,
                          MovieRepository movieRepository, CinemaRepository cinemaRepository) {
        this.bookingRepository = bookingRepository;
        this.showRepository = showRepository;
        this.userRepository = userRepository;
        this.foodItemRepository = foodItemRepository;
        this.movieRepository = movieRepository;
        this.cinemaRepository = cinemaRepository;
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    //method to create a booking
    public Booking createBooking(BookingRequest request) {
        Show show = resolveShow(request);
        User user = request.getUserId() == null ? null
                : userRepository.findById(request.getUserId()).orElse(null);

        int ticketTotal = request.getAdults() * show.getMovie().getAdultPrice()
                + request.getChildren() * show.getMovie().getChildPrice();
        int foodTotal = foodItemRepository.findAll().stream()
                .filter(food -> request.getFoodNames().contains(food.getName()))
                .mapToInt(FoodItem::getPrice)
                .sum();
        int total = ticketTotal + foodTotal;

        Payment payment = new Payment("Credit / Debit Card", "PAID", total);
        Booking booking = new Booking(user, show, request.getAdults(), request.getChildren(),
                request.getSeats(),
                request.getFoodNames(), request.getCustomerName(), request.getEmail(),
                request.getPhone(), payment);
        booking.setTicketTotal(ticketTotal);
        booking.setFoodTotal(foodTotal);
        booking.setGrandTotal(total);
        return bookingRepository.save(booking);
    }

    private Show resolveShow(BookingRequest request) {
        if (request.getShowId() != null) {
            return showRepository.findById(request.getShowId())
                    .orElseThrow(() -> new IllegalArgumentException("Show not found"));
        }

        var movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
        Cinema cinema = cinemaRepository.findByName(request.getCinemaName())
                .orElseGet(() -> cinemaRepository
                        .save(new Cinema(request.getCinemaName(), request.getCinemaName())));
        return showRepository.save(new Show(movie, cinema, request.getDate(), request.getTime()));
    }

    //method to delete all bookings
    public void deleteAllBookings() {
        bookingRepository.deleteAll();
    }
}
