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
import java.util.HashSet;
import java.util.Set;

@Service
public class BookingService {
        private final BookingRepository bookingRepository;
        private final ShowRepository showRepository;
        private final MovieRepository movieRepository;
        private final CinemaRepository cinemaRepository;
        private final UserRepository userRepository;
        private final FoodItemRepository foodItemRepository;

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

        public Booking createBooking(BookingRequest request) {
                Show show = resolveShow(request);
                User user = request.getUserId() == null ? null
                                : userRepository.findById(request.getUserId()).orElse(null);
                List<Booking> existingBookings = bookingRepository.findAll();

                Set<String> alreadyBookedSeats = new HashSet<>();

                for (Booking existing : existingBookings) {

                        if (existing.getShow() == null)
                                continue;

                        boolean sameMovie = existing.getShow().getMovie().getId()
                                        .equals(show.getMovie().getId());

                        boolean sameCinema = existing.getShow().getCinema().getName()
                                        .equalsIgnoreCase(show.getCinema().getName());

                        boolean sameDate = existing.getShow().getShowDate()
                                        .equals(show.getShowDate());

                        boolean sameTime = existing.getShow().getShowTime()
                                        .equals(show.getShowTime());

                        if (sameMovie && sameCinema && sameDate && sameTime) {
                                alreadyBookedSeats.addAll(existing.getSeats());
                        }
                }

                for (String seat : request.getSeats()) {
                        if (alreadyBookedSeats.contains(seat)) {
                                throw new RuntimeException(
                                                "Seat already booked: " + seat);
                        }
                }
                int ticketTotal = request.getAdults() * show.getMovie().getAdultPrice()
                                + request.getChildren() * show.getMovie().getChildPrice();
                int foodTotal = foodItemRepository.findAll().stream()
                                .filter(food -> request.getFoodNames().contains(food.getName()))
                                .mapToInt(FoodItem::getPrice)
                                .sum();
                int total = ticketTotal + foodTotal;

                Payment payment = request.getPayment();

                if (payment == null ||
                                payment.getCardHolderName() == null ||
                                payment.getCardHolderName().isBlank() ||
                                payment.getCardNumber() == null ||
                                payment.getCardNumber().isBlank() ||
                                payment.getExpiryDate() == null ||
                                payment.getExpiryDate().isBlank() ||
                                payment.getCvv() == null ||
                                payment.getCvv().isBlank()) {

                        throw new RuntimeException("Payment details are required");
                }

                payment.setMethod("Credit / Debit Card");
                payment.setStatus("PAID");
                payment.setAmount(total);
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

                var movie = movieRepository.findById(request.getMovieId())
                                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));

                Cinema cinema = cinemaRepository.findByName(request.getCinemaName())
                                .orElseGet(() -> cinemaRepository
                                                .save(new Cinema(request.getCinemaName(), request.getCinemaName())));

                List<Show> shows = showRepository.findAll();

                for (Show existingShow : shows) {

                        boolean sameMovie = existingShow.getMovie().getId().equals(movie.getId());

                        boolean sameCinema = existingShow.getCinema().getName()
                                        .equalsIgnoreCase(cinema.getName());

                        boolean sameDate = existingShow.getShowDate()
                                        .equals(request.getDate());

                        boolean sameTime = existingShow.getShowTime()
                                        .equals(request.getTime());

                        if (sameMovie && sameCinema && sameDate && sameTime) {
                                return existingShow;
                        }
                }

                Show newShow = new Show(
                                movie,
                                cinema,
                                request.getDate(),
                                request.getTime());

                return showRepository.save(newShow);
        }

        public void deleteAllBookings() {
                bookingRepository.deleteAll();
        }
}
