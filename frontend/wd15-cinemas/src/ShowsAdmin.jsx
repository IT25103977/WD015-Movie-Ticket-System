import React, { useState, useMemo } from 'react';
import { apiGet, apiPost, apiDelete } from './api';
import {
    Film, PlusCircle, Trash2, Star, Clock,
    Ticket, ArrowUpRight, AlertCircle, X as CloseIcon,
    CheckCircle2, Play, Info, MapPin, Calendar, LayoutDashboard,
    Layers, Plus, Save
} from 'lucide-react';

export default function MovieManagement({
    movies = [],
    setMovies,
    cinemas = ["WD15 Multiplex - Havelock City", "WD15 Elite - Kiribathgoda"],
    setCinemas,
    showtimes = ["10:30 AM", "01:15 PM", "04:30 PM", "07:30 PM"],
    setShowtimes
}) {
    // Navigation State
    const [activeTab, setActiveTab] = useState('movies'); // 'movies' | 'schedules'

    // --- MOVIE MANAGEMENT STATE ---
    const [isAddingMovie, setIsAddingMovie] = useState(false);
    const [newMovie, setNewMovie] = useState({
        title: "", image: "", tags: "", rating: "", duration: "",
        status: "Now Showing", adultPrice: "", childPrice: "",
        trailerUrl: "", synopsis: ""
    });

    // --- SCHEDULE MANAGEMENT STATE ---
    const [newLocation, setNewLocation] = useState('');
    const [newTime, setNewTime] = useState('');

    // --- MOVIE ACTIONS ---
    const addMovie = () => {
        if (!newMovie.title) return;
        const movie = {
            id: Date.now(),
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
        if (typeof setMovies === 'function') setMovies([...movies, movie]);
        setNewMovie({
            title: "", image: "", tags: "", rating: "", duration: "",
            status: "Now Showing", adultPrice: "", childPrice: "",
            trailerUrl: "", synopsis: ""
        });
        setIsAddingMovie(false);
    };

    const deleteMovie = (id) => {
        if (window.confirm('Are you sure you want to remove this movie?')) {
            if (typeof setMovies === 'function') setMovies(movies.filter(m => m.id !== id));
        }
    };

    // --- SCHEDULE ACTIONS ---
    const handleAddLocation = () => {
        if (newLocation && typeof setCinemas === 'function') {
            apiPost('/cinemas', { name: newLocation, location: newLocation })
                .then(saved => {
                    setCinemas([...cinemas.map(c => typeof c === 'string' ? c : c.name), saved.name]);
                    setNewLocation('');
                })
                .catch(() => { setCinemas([...cinemas.map(c => typeof c === 'string' ? c : c.name), newLocation]); setNewLocation(''); });
        }
    };

    const handleDeleteLocation = (loc) => {
        const locName = typeof loc === 'string' ? loc : loc.name;
        if (typeof setCinemas === 'function') {
            apiGet('/cinemas')
                .then(items => {
                    const found = items.find(c => c.name === locName);
                    if (!found) return;
                    return apiDelete(`/cinemas/${found.id}`);
                })
                .then(() => setCinemas(cinemas.filter(c => (typeof c === 'string' ? c : c.name) !== locName)))
                .catch(() => alert('Cinema delete failed. Check backend is running.'));
        }
    };

    const handleAddTime = () => {
        if (newTime && typeof setShowtimes === 'function') {
            apiPost('/times', { slotValue: newTime })
                .then(saved => {
                    setShowtimes([...showtimes, saved.slotValue].sort());
                    setNewTime('');
                })
                .catch(() => { setShowtimes([...showtimes, newTime].sort()); setNewTime(''); });
        }
    };

    // --- STATS ---
    const stats = useMemo(() => {
        const movieArray = Array.isArray(movies) ? movies : [];
        return {
            totalMovies: movieArray.length,
            activeMovies: movieArray.filter(m => m.status === 'Now Showing').length,
            locations: cinemas?.length || 0,
            slots: showtimes?.length || 0
        };
    }, [movies, cinemas, showtimes]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-[#e11d48]">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* HEADER & TAB NAVIGATION */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Admin Console</h1>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Manage Content, Locations & Show Schedules</p>
                    </div>

                    <div className="flex bg-[#121212] p-1.5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setActiveTab('movies')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'movies' ? 'bg-[#e11d48] text-white shadow-lg shadow-[#e11d48]/20' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <Film size={14} /> Movie Library
                        </button>
                        <button
                            onClick={() => setActiveTab('schedules')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'schedules' ? 'bg-[#e11d48] text-white shadow-lg shadow-[#e11d48]/20' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <Calendar size={14} /> Schedules & Loc
                        </button>
                    </div>
                </div>

                {/* TOP STATS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Movies', val: stats.totalMovies, icon: Film, color: 'text-blue-500' },
                        { label: 'Now Showing', val: stats.activeMovies, icon: Ticket, color: 'text-red-500' },
                        { label: 'Cinemas', val: stats.locations, icon: MapPin, color: 'text-yellow-500' },
                        { label: 'Time Slots', val: stats.slots, icon: Clock, color: 'text-green-500' },
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

                {/* TAB CONTENT: MOVIES */}
                {activeTab === 'movies' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black italic uppercase tracking-tight">Movie Management</h2>
                            <button
                                onClick={() => setIsAddingMovie(!isAddingMovie)}
                                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg ${isAddingMovie ? 'bg-white text-black' : 'bg-[#e11d48] text-white shadow-[#e11d48]/20'
                                    }`}
                            >
                                {isAddingMovie ? <CloseIcon size={18} /> : <PlusCircle size={18} />}
                                {isAddingMovie ? 'Cancel' : 'Add New Movie'}
                            </button>
                        </div>

                        {/* ADD MOVIE FORM */}
                        {isAddingMovie && (
                            <div className="bg-[#121212] border border-[#e11d48]/20 p-8 rounded-[2.5rem] space-y-6 shadow-2xl animate-in zoom-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Movie Title</label>
                                        <input placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Image URL</label>
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
                                        <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Status</label>
                                        <select value={newMovie.status} onChange={(e) => setNewMovie({ ...newMovie, status: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm appearance-none">
                                            <option className="bg-[#121212]">Now Showing</option>
                                            <option className="bg-[#121212]">Coming Soon</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Adult Price (Rs)</label>
                                        <input placeholder="1350" value={newMovie.adultPrice} onChange={(e) => setNewMovie({ ...newMovie, adultPrice: e.target.value })} className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#e11d48] text-sm" />
                                    </div>
                                </div>
                                <button onClick={addMovie} className="bg-[#e11d48] text-white w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-[#e11d48]/20 hover:bg-[#be123c] transition-all">Publish Movie</button>
                            </div>
                        )}

                        {/* MOVIE LISTING GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {movies.map((m) => (
                                <div key={m.id} className="bg-[#121212] border border-white/5 rounded-[3rem] overflow-hidden group flex flex-col hover:border-[#e11d48]/30 transition-all duration-500">
                                    <div className="relative h-60 overflow-hidden">
                                        <img src={m.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" alt={m.title} />
                                        <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-white/10 tracking-widest">{m.duration}</div>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-[#e11d48] transition-colors">{m.title}</h3>
                                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${m.status === 'Now Showing' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>{m.status}</span>
                                            <button onClick={() => deleteMovie(m.id)} className="p-3 bg-white/5 text-gray-600 rounded-2xl hover:bg-red-600/10 hover:text-red-600 transition-all"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: CINEMA & SCHEDULES */}
                {activeTab === 'schedules' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom duration-500">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* THEATER LOCATIONS */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-2xl"><MapPin size={24} /></div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tight">Theater Locations</h2>
                                </div>

                                <div className="bg-[#121212] border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Enter new cinema name..."
                                            className="flex-1 bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-yellow-500 text-sm"
                                            value={newLocation}
                                            onChange={(e) => setNewLocation(e.target.value)}
                                        />
                                        <button onClick={handleAddLocation} className="bg-yellow-500 text-black px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">Add Loc</button>
                                    </div>

                                    <div className="space-y-3">
                                        {cinemas && cinemas.map((loc, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-yellow-500/30 transition-all">
                                                <span className="font-bold text-sm uppercase tracking-wide">{loc}</span>
                                                <button onClick={() => handleDeleteLocation(loc)} className="p-2 text-gray-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* SHOW TIME SLOTS */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl"><Clock size={24} /></div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tight">Standard Time Slots</h2>
                                </div>

                                <div className="bg-[#121212] border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Ex: 04:30 PM"
                                            className="flex-1 bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-green-500 text-sm"
                                            value={newTime}
                                            onChange={(e) => setNewTime(e.target.value)}
                                        />
                                        <button onClick={handleAddTime} className="bg-green-500 text-black px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">Add Slot</button>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {showtimes && showtimes.map((time, i) => (
                                            <div key={i} className="px-5 py-3 bg-white/5 rounded-full border border-white/5 flex items-center gap-3 group">
                                                <span className="text-xs font-black tracking-widest">{time}</span>
                                                <button onClick={() => {
                                                    apiGet('/times')
                                                        .then(items => {
                                                            const found = items.find(t => t.slotValue === time);
                                                            if (!found) return;
                                                            return apiDelete(`/times/${found.id}`);
                                                        })
                                                        .then(() => setShowtimes(showtimes.filter(t => t !== time)))
                                                        .catch(() => alert('Time slot delete failed. Check backend is running.'));
                                                }} className="text-red-500 opacity-0 group-hover:opacity-100 transition-all"><CloseIcon size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* MOVIE ASSIGNMENT OVERVIEW */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl"><Layers size={24} /></div>
                                <h2 className="text-2xl font-black italic uppercase tracking-tight">Show Assignments Overview</h2>
                            </div>

                            <div className="bg-[#121212] border border-white/5 p-10 rounded-[3rem] overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {movies && movies.filter(m => m.status === 'Now Showing').map(movie => (
                                        <div key={movie.id} className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <img src={movie.image} className="w-12 h-16 rounded-lg object-cover" alt="" />
                                                <div>
                                                    <p className="font-black uppercase text-sm italic">{movie.title}</p>
                                                    <p className="text-[10px] text-[#e11d48] font-black uppercase tracking-widest">Active Screen</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Broadcasted In:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {cinemas && cinemas.slice(0, 2).map((c, idx) => (
                                                        <span key={idx} className="text-[9px] font-black px-3 py-1 bg-white/5 rounded-full border border-white/10 uppercase">{c.split('-')[0]}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
