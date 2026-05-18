import React, { useState, useMemo } from 'react';
import { apiPost, apiDelete, normalizeMovie, moviePayload } from './api';
import {
    Film, PlusCircle, Trash2, Star, Clock,
    Ticket, ArrowUpRight, AlertCircle, X as CloseIcon,
    CheckCircle2, Play, Info
} from 'lucide-react';

export default function MovieManagement({ movies = [], setMovies }) {

    const [isAddingMovie, setIsAddingMovie] = useState(false);
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
        if (!newMovie.title) return;

        const movie = {
            title: newMovie.title,
            image: newMovie.image || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=500",
            tags: newMovie.tags ? newMovie.tags.split(",").map(t => t.trim()).filter(t => t !== "") : [],
            rating: parseFloat(newMovie.rating) || 0,
            duration: newMovie.duration || "N/A",
            status: newMovie.status,
            prices: {
                adult: parseInt(newMovie.adultPrice) || 0,
                child: parseInt(newMovie.childPrice) || 0,
            },
            trailerUrl: newMovie.trailerUrl,
            synopsis: newMovie.synopsis
        };

        apiPost('/movies', moviePayload(movie))
            .then(saved => {
                if (typeof setMovies === 'function') setMovies([...movies, normalizeMovie(saved)]);
                setNewMovie({
                    title: "", image: "", tags: "", rating: "", duration: "",
                    status: "Now Showing", adultPrice: "", childPrice: "",
                    trailerUrl: "", synopsis: ""
                });
                setIsAddingMovie(false);
            })
            .catch(() => {
                if (typeof setMovies === 'function') setMovies([...movies, { ...movie, id: Date.now() }]);
                setNewMovie({
                    title: "", image: "", tags: "", rating: "", duration: "",
                    status: "Now Showing", adultPrice: "", childPrice: "",
                    trailerUrl: "", synopsis: ""
                });
                setIsAddingMovie(false);
            });
    };

    const deleteMovie = (id) => {
        if (window.confirm('Are you sure you want to remove this movie from the library?')) {
            if (typeof setMovies === 'function') setMovies(movies.filter(m => m.id !== id));
            apiDelete(`/movies/${id}`).catch(() => console.warn('Backend movie delete failed'));
        }
    };


    const stats = useMemo(() => {
        const movieArray = Array.isArray(movies) ? movies : [];
        return {
            totalMovies: movieArray.length,
            activeMovies: movieArray.filter(m => m.status === 'Now Showing').length,
            comingSoon: movieArray.filter(m => m.status === 'Coming Soon').length,
            avgRating: movieArray.length > 0
                ? (movieArray.reduce((acc, m) => acc + (parseFloat(m.rating) || 0), 0) / movieArray.length).toFixed(1)
                : "0.0"
        };
    }, [movies]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-[#e11d48]">
            <div className="max-w-7xl mx-auto space-y-8">


                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Movie Management</h1>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Update library, pricing, and show statuses</p>
                    </div>
                    <button
                        onClick={() => setIsAddingMovie(!isAddingMovie)}
                        className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg ${isAddingMovie ? 'bg-white text-black' : 'bg-[#e11d48] text-white shadow-[#e11d48]/20'
                            }`}
                    >
                        {isAddingMovie ? <CloseIcon size={18} /> : <PlusCircle size={18} />}
                        {isAddingMovie ? 'Cancel' : 'Add New Movie'}
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Library', val: stats.totalMovies, icon: Film, color: 'text-blue-500' },
                        { label: 'Now Showing', val: stats.activeMovies, icon: Ticket, color: 'text-red-500' },
                        { label: 'Coming Soon', val: stats.comingSoon, icon: Clock, color: 'text-yellow-500' },
                        { label: 'Avg Rating', val: stats.avgRating, icon: Star, color: 'text-green-500' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#121212] border border-white/5 p-6 rounded-[2rem] space-y-2">
                            <div className="flex items-center justify-between">
                                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}><stat.icon size={20} /></div>
                                <ArrowUpRight className="text-gray-700" size={16} />
                            </div>
                            <p className="text-3xl font-black">{stat.val}</p>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>


                {isAddingMovie && (
                    <div className="bg-[#121212] border border-[#e11d48]/20 p-8 rounded-[2.5rem] space-y-6 shadow-2xl animate-in zoom-in duration-300">
                        <h2 className="text-xl font-black italic uppercase tracking-widest text-[#e11d48]">Create Movie Entry</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Movie Title</label>
                                <input placeholder="Ex: Deadpool & Wolverine" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Poster Image URL</label>
                                <input placeholder="https://..." value={newMovie.image} onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Rating</label>
                                <input placeholder="4.8" value={newMovie.rating} onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Duration</label>
                                <input placeholder="2h 15m" value={newMovie.duration} onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Tags (Comma separated)</label>
                                <input placeholder="Action, Sci-Fi" value={newMovie.tags} onChange={(e) => setNewMovie({ ...newMovie, tags: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Show Status</label>
                                <select value={newMovie.status} onChange={(e) => setNewMovie({ ...newMovie, status: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm appearance-none">
                                    <option className="bg-[#121212]">Now Showing</option>
                                    <option className="bg-[#121212]">Coming Soon</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Adult Price (Rs)</label>
                                <input placeholder="1350" value={newMovie.adultPrice} onChange={(e) => setNewMovie({ ...newMovie, adultPrice: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Child Price (Rs)</label>
                                <input placeholder="900" value={newMovie.childPrice} onChange={(e) => setNewMovie({ ...newMovie, childPrice: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Trailer URL (Embed)</label>
                                <input placeholder="https://youtube.com/embed/..." value={newMovie.trailerUrl} onChange={(e) => setNewMovie({ ...newMovie, trailerUrl: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Synopsis</label>
                            <textarea placeholder="Briefly describe the movie plot..." value={newMovie.synopsis} onChange={(e) => setNewMovie({ ...newMovie, synopsis: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm h-32 resize-none" />
                        </div>
                        <button onClick={addMovie} className="bg-[#e11d48] text-white w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-[#e11d48]/20 hover:bg-[#be123c] transition-all">Publish to Library</button>
                    </div>
                )}


                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-2xl font-black italic uppercase tracking-tight">Active Library</h2>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{movies?.length || 0} Movies Found</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {movies && Array.isArray(movies) && movies.map((m) => (
                            <div key={m.id} className="bg-[#121212] border border-white/5 rounded-[3rem] overflow-hidden group flex flex-col hover:border-[#e11d48]/30 transition-all duration-500">
                                <div className="relative h-64 overflow-hidden">
                                    <img src={m.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" alt={m.title} />
                                    <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-white/10 tracking-widest">
                                        {m.duration}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                                </div>

                                <div className="p-8 space-y-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none group-hover:text-[#e11d48] transition-colors">{m.title}</h3>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {m.tags && Array.isArray(m.tags) && m.tags.map(t => (
                                                    <span key={t} className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 bg-[#e11d48]/10 text-[#e11d48] rounded-sm">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-xl border border-yellow-500/20">
                                            <Star size={14} className="fill-yellow-500" />
                                            <span className="text-xs font-black">{m.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 italic">
                                        {m.synopsis || "No synopsis provided for this title."}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                                        <div>
                                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Adult Price</p>
                                            <p className="text-sm font-black">Rs. {m.prices?.adult?.toLocaleString() || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Child Price</p>
                                            <p className="text-sm font-black">Rs. {m.prices?.child?.toLocaleString() || 0}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${m.status === 'Now Showing' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{m.status}</span>
                                        </div>
                                        <button
                                            onClick={() => deleteMovie(m.id)}
                                            className="p-3 bg-white/5 text-gray-600 rounded-2xl hover:bg-red-600/10 hover:text-red-600 transition-all active:scale-95"
                                            title="Delete Movie"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!movies || movies.length === 0) && (
                            <div className="col-span-full py-32 text-center bg-[#121212] rounded-[3rem] border border-dashed border-white/10 space-y-6">
                                <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-600">
                                    <Film size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black italic uppercase">The Library is Empty</h3>
                                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Start by adding your first movie entry</p>
                                </div>
                                <button onClick={() => setIsAddingMovie(true)} className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#e11d48] hover:text-white transition-all">Add Movie</button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
