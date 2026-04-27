function Movies({ movies, startBooking, setActiveTrailer }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white px-6 md:px-12 py-16">

            {/* TITLE */}
            <h1 className="text-4xl font-black mb-12">All Movies</h1>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

                {movies.map((movie) => (
                    <div key={movie.id} className="group">

                        {/* IMAGE */}
                        <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10">
                            <img
                                src={movie.image}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            />

                            {/* HOVER */}
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">

                                <button
                                    onClick={() => startBooking(movie)}
                                    className="bg-red-600 px-4 py-2 text-xs font-bold rounded-full"
                                >
                                    BUY
                                </button>

                                <button
                                    onClick={() => setActiveTrailer(movie.trailerUrl)}
                                    className="bg-white/20 px-4 py-2 text-xs font-bold rounded-full"
                                >
                                    TRAILER
                                </button>

                            </div>
                        </div>

                        {/* TITLE */}
                        <h3 className="mt-3 text-sm font-bold uppercase group-hover:text-red-500 transition">
                            {movie.title}
                        </h3>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default Movies;