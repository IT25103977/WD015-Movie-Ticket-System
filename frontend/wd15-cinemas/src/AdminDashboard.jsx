import { useState } from "react";
import Users from "./Users";
import MoviesAdmin from "./MoviesAdmin";
import ShowsAdmin from "./ShowsAdmin";
import TicketHistory from "./TicketHistory";

function AdminDashboard({ movies, setMovies, users, setUsers, shows, setShows, cinemas, setCinemas, showtimes, setShowtimes, bookings }) {

    const [tab, setTab] = useState("movies");

    const [newMovie, setNewMovie] = useState({
        title: "",
        image: "",
        tags: "",
        rating: "",
        duration: "",
        status: "Now Showing",
        adultPrice: "",
        childPrice: "",
        trailerUrl: "",
        synopsis: ""
    });
    const addMovie = () => {
        const movie = {
            id: Date.now(),
            title: newMovie.title,
            image: newMovie.image,
            tags: newMovie.tags.split(","),
            rating: parseFloat(newMovie.rating),
            duration: newMovie.duration,
            status: newMovie.status,
            prices: {
                adult: parseInt(newMovie.adultPrice),
                child: parseInt(newMovie.childPrice),
            },
            trailerUrl: newMovie.trailerUrl,
            synopsis: newMovie.synopsis
        };

        setMovies([...movies, movie]);


        setNewMovie({
            title: "",
            image: "",
            tags: "",
            rating: "",
            duration: "",
            status: "Now Showing",
            adultPrice: "",
            childPrice: "",
            trailerUrl: "",
            synopsis: ""
        });
    };

    const deleteMovie = (id) => {
        setMovies(movies.filter(m => m.id !== id));
    };

    return (
        <div className="p-10 text-white min-h-screen bg-black">

            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>


            <div className="flex gap-6 mb-10">
                <button onClick={() => setTab("movies")} className="hover:text-red-500">Movies</button>
                <button onClick={() => setTab("users")} className="hover:text-red-500">Users</button>
                <button onClick={() => setTab("shows")} className="hover:text-red-500">Shows</button>
                <button onClick={() => setTab("tickets")} className="hover:text-red-500">Ticket History</button>
            </div>


            {tab === "movies" && (
                <MoviesAdmin movies={movies} setMovies={setMovies} />
            )}


            {tab === "users" && (
                <Users users={users} setUsers={setUsers} />
            )}

            {tab === "shows" && (
                <ShowsAdmin
                    shows={shows}
                    setShows={setShows}
                    movies={movies}
                    setMovies={setMovies}
                    cinemas={cinemas}
                    setCinemas={setCinemas}
                    showtimes={showtimes}
                    setShowtimes={setShowtimes}
                />
            )}
            {tab === "tickets" && (
                <TicketHistory bookings={bookings} />
            )}
        </div>
    );
}

export default AdminDashboard;
