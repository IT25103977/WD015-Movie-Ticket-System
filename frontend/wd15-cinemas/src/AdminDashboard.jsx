import { useState } from "react";
import Users from "./Users";
import MoviesAdmin from "./MoviesAdmin";
import ShowsAdmin from "./ShowsAdmin";

function AdminDashboard({ movies, setMovies, users, setUsers, shows, setShows }) {

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

        // Reset form
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

            {/* TABS */}
            <div className="flex gap-6 mb-10">
                <button onClick={() => setTab("movies")} className="hover:text-red-500">Movies</button>
                <button onClick={() => setTab("users")} className="hover:text-red-500">Users</button>
                <button onClick={() => setTab("shows")} className="hover:text-red-500">Shows</button>
            </div>

            {/* MOVIES TAB */}
            {tab === "movies" && (
                <MoviesAdmin movies={movies} setMovies={setMovies} />
            )}

            {/* USERS TAB */}
            {tab === "users" && (
                <Users users={users} setUsers={setUsers} />
            )}

            {/* SHOWS TAB */}
            {tab === "shows" && (
                <ShowsAdmin
                    shows={shows}
                    setShows={setShows}
                    movies={movies}
                />
            )}

        </div>
    );
}

export default AdminDashboard;