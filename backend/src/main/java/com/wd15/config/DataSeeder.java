package com.wd15.config;

import com.wd15.model.Admin;
import com.wd15.model.Cinema;
import com.wd15.model.FoodItem;
import com.wd15.model.Movie;
import com.wd15.model.Show;
import com.wd15.model.TimeSlot;
import com.wd15.model.User;
import com.wd15.repository.CinemaRepository;
import com.wd15.repository.FoodItemRepository;
import com.wd15.repository.MovieRepository;
import com.wd15.repository.ShowRepository;
import com.wd15.repository.TimeSlotRepository;
import com.wd15.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;
    private final ShowRepository showRepository;
    private final FoodItemRepository foodItemRepository;
    private final UserRepository userRepository;
    private final TimeSlotRepository timeSlotRepository;

    public DataSeeder(MovieRepository movieRepository, CinemaRepository cinemaRepository,
                      ShowRepository showRepository, FoodItemRepository foodItemRepository,
                      UserRepository userRepository, TimeSlotRepository timeSlotRepository) {
        this.movieRepository = movieRepository;
        this.cinemaRepository = cinemaRepository;
        this.showRepository = showRepository;
        this.foodItemRepository = foodItemRepository;
        this.userRepository = userRepository;
        this.timeSlotRepository = timeSlotRepository;
    }

    @Override
    public void run(String... args) {
        if (movieRepository.count() == 0) {
            movieRepository.saveAll(List.of(
                    new Movie("Dune: Part Two", "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", List.of("Action", "Sci-Fi"), 4.8, "2h 46m", "Now Showing", 1350, 900, "https://www.youtube.com/embed/Way9Dexny3w", "Paul Atreides unites with the Fremen for revenge.", null),
                    new Movie("Kingdom of the Planet of the Apes", "https://tse3.mm.bing.net/th/id/OIP.i63Tprb5wvHn8iOnQawfmQHaK_?rs=1&pid=ImgDetMain&o=7&rm=3", List.of("Action", "Adventure"), 4.5, "2h 25m", "Now Showing", 1250, 850, "https://www.youtube.com/embed/Kdr5oedn7q8", "A young ape questions everything after Caesar.", null),
                    new Movie("The Fall Guy", "https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/03/the-fall-guy-poster.jpeg", List.of("Action", "Comedy"), 4.3, "2h 06m", "Now Showing", 1150, 700, "https://www.youtube.com/embed/j7jPnwVGdZ8", "A stuntman gets involved in a missing star case.", null),
                    new Movie("Godzilla x Kong", "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg", List.of("Action", "Sci-Fi"), 4.6, "1h 55m", "Now Showing", 1300, 800, "https://www.youtube.com/embed/lV1OOlGwExM", "Godzilla and Kong face a hidden threat.", null),
                    new Movie("Deadpool & Wolverine", "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", List.of("Action", "Comedy"), 4.9, "2h 10m", "Now Showing", 1400, 950, "https://www.youtube.com/embed/73_1biulkYk", "Deadpool teams up with Wolverine in chaos.", null),
                    new Movie("Inside Out 2", "https://tse2.mm.bing.net/th/id/OIP.gyIevw44AcdD8SHqLnbgsAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3", List.of("Animation", "Family"), 4.7, "1h 45m", "Now Showing", 1100, 600, "https://www.youtube.com/embed/LEjhY15eCx0", "Riley faces new emotions in teenage years.", null),
                    new Movie("Bad Boys: Ride or Die", "https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/04/bad-boys-ride-or-die.jpeg", List.of("Action", "Comedy"), 0.0, "1h 55m", "Coming Soon", 1400, 1000, "https://www.youtube.com/embed/hRFY_Fesa9Q", "The world's favorite Bad Boys are back.", "June 07, 2024"),
                    new Movie("Spider-Man: Brand New Day", "https://www.newdvdreleasedates.com/images/posters/spider-man-brand-new-day-2026.jpg", List.of("Action", "Comedy"), 0.0, "1h 55m", "Coming Soon", 1400, 1000, "https://www.youtube.com/embed/aBlsrtxuwss", "Peter Parker navigates the complexities of his double life.", "June 07, 2026")
            ));
        }

        if (cinemaRepository.count() == 0) {
            cinemaRepository.saveAll(List.of(
                    new Cinema("WD15 Multiplex - Havelock City Mall", "Colombo"),
                    new Cinema("WD15 Multiplex - Colombo City Centre", "Colombo"),
                    new Cinema("WD15 Elite - Kiribathgoda", "Kiribathgoda"),
                    new Cinema("WD15 Screen - Colpetty", "Colpetty")
            ));
        }

        if (foodItemRepository.count() == 0) {
            foodItemRepository.saveAll(List.of(
                    new FoodItem("POPCORN", "Caramel Popcorn (L)", 950, "Large sweet & crunchy"),
                    new FoodItem("POPCORN", "Salted Popcorn (M)", 750, "Classic salted medium"),
                    new FoodItem("POPCORN", "Cheese Popcorn (L)", 1100, "Cheesy blast large"),
                    new FoodItem("BUNS", "Chicken Hotdog", 650, "Classic chicken sausage"),
                    new FoodItem("BUNS", "Veg Burger", 850, "Crispy veg patty"),
                    new FoodItem("BUNS", "Beef Slider", 950, "Double beef patty"),
                    new FoodItem("BEVERAGES", "Pepsi 600ml", 400, "Chilled soft drink"),
                    new FoodItem("BEVERAGES", "Iced Coffee", 550, "Cold brewed mocha"),
                    new FoodItem("BEVERAGES", "Mineral Water", 150, "500ml pure water")
            ));
        }

        if (userRepository.count() == 0) {
            userRepository.save(new Admin("Admin", "admin@gmail.com", "admin123", "SUPER"));
            userRepository.save(new User("Tharusha", "user@gmail.com", "user123", "Customer"));
        }

        if (timeSlotRepository.count() == 0) {
            timeSlotRepository.saveAll(List.of(
                    new TimeSlot("10:30 AM"),
                    new TimeSlot("01:15 PM"),
                    new TimeSlot("04:30 PM"),
                    new TimeSlot("07:30 PM"),
                    new TimeSlot("10:15 PM")
            ));
        }

        if (showRepository.count() == 0) {
            List<Movie> movies = movieRepository.findByStatus("Now Showing");
            List<Cinema> cinemas = cinemaRepository.findAll();
            List<String> times = List.of("10:30 AM", "01:15 PM", "04:30 PM", "07:30 PM", "10:15 PM");
            for (int i = 0; i < Math.min(movies.size(), 4); i++) {
                showRepository.save(new Show(movies.get(i), cinemas.get(i % cinemas.size()), LocalDate.now().toString(), times.get(i)));
            }
        }
    }
}
