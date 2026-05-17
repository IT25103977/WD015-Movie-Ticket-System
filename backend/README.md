# WD15 Cinemas Backend

Spring Boot backend for the WD15 Cinemas React frontend.

## How To Run

```bash
cd backend
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`

H2 database console: `http://localhost:8080/h2-console`

Use these H2 login values:

```text
JDBC URL: jdbc:h2:file:./data/wd15db
User: sa
Password: leave empty
```

## Main API Routes

```text
GET    /api/movies
GET    /api/movies?status=Now Showing
POST   /api/movies
PUT    /api/movies/{id}
DELETE /api/movies/{id}

GET    /api/cinemas
POST   /api/cinemas

GET    /api/shows
GET    /api/shows?movieId=1
POST   /api/shows

GET    /api/foods
GET    /api/foods?category=POPCORN

GET    /api/users
POST   /api/users/signup
POST   /api/users/login

GET    /api/bookings
POST   /api/bookings
```

## Frontend Quick Connect

Add this near the top of your React file:

```js
const API_URL = "http://localhost:8080/api";
```

Replace your `useState(INITIAL_MOVIES)` with:

```js
const [movies, setMovies] = useState([]);
```

Then add:

```js
useEffect(() => {
  fetch(`${API_URL}/movies`)
    .then(res => res.json())
    .then(data => setMovies(data))
    .catch(() => setMovies(INITIAL_MOVIES));
}, []);
```

For login:

```js
fetch(`${API_URL}/users/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
})
  .then(res => res.json())
  .then(user => {
    setUser(user);
    setIsLoginOpen(false);
  });
```

For final booking/payment confirmation:

```js
fetch(`${API_URL}/bookings`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    showId: 1,
    userId: user?.id,
    adults: booking.adults,
    children: booking.children,
    seats: booking.seats,
    foodNames: booking.food.map(item => item.name),
    customerName: booking.userDetails.name,
    email: booking.userDetails.email,
    phone: booking.userDetails.phone
  })
})
  .then(res => res.json())
  .then(() => setView("success"));
```

## OOP Concepts Used

Constructor: every model has a default constructor for Spring/JPA and custom constructors for creating objects with values.

Inheritance: `BaseEntity -> Person -> User -> Admin`.

Composition: `Booking` owns an embedded `Payment`. A payment belongs inside a booking.

Aggregation: `Booking` uses an existing `Show`, and `Show` uses existing `Movie` and `Cinema`.

Association: `User` is associated with `Booking`, `Movie` is associated with `Show`, and `Cinema` is associated with `Show`.

Dependency: services depend on repositories through constructor injection, for example `BookingService(BookingRepository bookingRepository, ...)`.
