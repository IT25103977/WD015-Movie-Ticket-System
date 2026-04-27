import React, { useState, useMemo } from 'react';
import {
    Users, UserPlus, Search, Filter, MoreVertical,
    Edit3, Trash2, Shield, ShieldCheck, UserCheck,
    UserMinus, Mail, Phone, Calendar, ArrowUpRight,
    ChevronLeft, ChevronRight, CheckCircle2, AlertCircle,
    Clock, Download, LayoutGrid, List
} from 'lucide-react';

// --- MOCK DATA GENERATOR ---
const INITIAL_USERS = [
    {
        id: 'USR-001',
        name: 'Tharusha Bimsara',
        email: 'tharusha@wd15.com',
        phone: '+94 77 234 2465',
        role: 'Admin',
        status: 'Active',
        joinedDate: '2024-01-15',
        lastLogin: '2 hours ago',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tharusha'
    },
    {
        id: 'USR-002',
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        phone: '+94 71 555 1234',
        role: 'Customer',
        status: 'Active',
        joinedDate: '2024-02-10',
        lastLogin: '1 day ago',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
        id: 'USR-003',
        name: 'Sarah Jenkins',
        email: 'sarah.j@outlook.com',
        phone: '+94 76 888 4321',
        role: 'Staff',
        status: 'Suspended',
        joinedDate: '2023-11-05',
        lastLogin: '3 weeks ago',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
        id: 'USR-004',
        name: 'Michael Chen',
        email: 'm.chen@tech.com',
        phone: '+94 72 444 9988',
        role: 'Customer',
        status: 'Active',
        joinedDate: '2024-03-22',
        lastLogin: 'Just now',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    {
        id: 'USR-005',
        name: 'Admin Assistant',
        email: 'assistant@wd15.com',
        phone: '+94 77 111 2222',
        role: 'Admin',
        status: 'Active',
        joinedDate: '2023-08-12',
        lastLogin: '5 mins ago',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Assistant'
    }
];

const ROLES = ['All Roles', 'Admin', 'Staff', 'Customer'];
const STATUSES = ['All Status', 'Active', 'Suspended'];

export default function App() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // --- DERIVED DATA ---
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchTerm, roleFilter, statusFilter]);

    const stats = useMemo(() => ({
        total: users.length,
        admins: users.filter(u => u.role === 'Admin').length,
        active: users.filter(u => u.status === 'Active').length,
        suspended: users.filter(u => u.status === 'Suspended').length
    }), [users]);

    // --- ACTIONS ---
    const toggleUserStatus = (id) => {
        setUsers(users.map(u =>
            u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
        ));
    };

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to remove this user permanently?')) {
            setUsers(users.filter(u => u.id !== id));
            if (selectedUser?.id === id) setSelectedUser(null);
        }
    };

    const updateRole = (id, newRole) => {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-[#e11d48]">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">User Management</h1>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Manage roles, permissions, and account statuses</p>
                    </div>
                    <button className="bg-[#e11d48] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#be123c] transition-all shadow-lg shadow-[#e11d48]/20">
                        <UserPlus size={18} /> Add New User
                    </button>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Accounts', val: stats.total, icon: Users, color: 'text-blue-500' },
                        { label: 'Admins', val: stats.admins, icon: ShieldCheck, color: 'text-red-500' },
                        { label: 'Active Users', val: stats.active, icon: UserCheck, color: 'text-green-500' },
                        { label: 'Suspended', val: stats.suspended, icon: UserMinus, color: 'text-yellow-500' },
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

                {/* CONTROL BAR */}
                <div className="bg-[#121212] border border-white/5 p-4 rounded-[2rem] flex flex-col lg:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full bg-black/50 border border-white/5 pl-14 pr-6 py-4 rounded-2xl outline-none focus:border-[#e11d48] transition-all font-medium text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="flex items-center gap-2 bg-black/50 border border-white/5 px-4 rounded-2xl">
                            <Filter size={16} className="text-gray-500" />
                            <select
                                className="bg-transparent py-4 text-xs font-black uppercase outline-none"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                {ROLES.map(r => <option key={r} className="bg-[#121212]">{r}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 bg-black/50 border border-white/5 px-4 rounded-2xl">
                            <Clock size={16} className="text-gray-500" />
                            <select
                                className="bg-transparent py-4 text-xs font-black uppercase outline-none"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {STATUSES.map(s => <option key={s} className="bg-[#121212]">{s}</option>)}
                            </select>
                        </div>
                        <button className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all text-gray-400">
                            <Download size={20} />
                        </button>
                    </div>
                </div>

                {/* USER LIST / TABLE */}
                <div className="bg-[#121212] border border-white/5 rounded-[2.5rem] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">User Profile</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Account Role</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Last Activity</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`group hover:bg-white/[0.02] transition-all cursor-pointer ${selectedUser?.id === user.id ? 'bg-white/[0.04]' : ''}`}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e11d48] to-[#be123c] p-0.5">
                                                    <img src={user.avatar} className="w-full h-full rounded-[0.9rem] bg-black" alt={user.name} />
                                                </div>
                                                <div>
                                                    <p className="font-black uppercase text-sm tracking-tight">{user.name}</p>
                                                    <p className="text-[11px] text-gray-500 font-medium">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${user.role === 'Admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                    user.role === 'Staff' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        'bg-white/5 text-gray-400 border-white/10'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-yellow-500'}`} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{user.lastLogin}</p>
                                        </td>
                                        <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setIsEditModalOpen(true)}
                                                    className="p-3 bg-white/5 rounded-xl hover:bg-white/10 hover:text-blue-500 transition-all"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => toggleUserStatus(user.id)}
                                                    className={`p-3 bg-white/5 rounded-xl transition-all ${user.status === 'Active' ? 'hover:text-yellow-500' : 'hover:text-green-500'}`}
                                                    title={user.status === 'Active' ? 'Suspend' : 'Activate'}
                                                >
                                                    {user.status === 'Active' ? <UserMinus size={16} /> : <UserCheck size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="p-3 bg-white/5 rounded-xl hover:bg-red-500/20 hover:text-red-600 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center space-y-4">
                            <div className="bg-white/5 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto text-gray-600"><AlertCircle size={32} /></div>
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">No matching users found</p>
                        </div>
                    )}
                </div>

                {/* BOTTOM PAGINATION (Mocked) */}
                <div className="flex items-center justify-between px-6">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Showing {filteredUsers.length} of {users.length} users</p>
                    <div className="flex gap-2">
                        <button className="p-3 bg-white/5 rounded-xl disabled:opacity-30" disabled><ChevronLeft size={16} /></button>
                        <button className="p-3 bg-[#e11d48] rounded-xl font-black text-[10px]">1</button>
                        <button className="p-3 bg-white/5 rounded-xl font-black text-[10px]">2</button>
                        <button className="p-3 bg-white/5 rounded-xl"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* USER DETAIL SIDE PANEL */}
            {selectedUser && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
                    <div className="relative w-full max-w-md bg-[#0f0f0f] border-l border-white/10 h-full animate-in slide-in-from-right duration-300 p-10 flex flex-col">
                        <button onClick={() => setSelectedUser(null)} className="absolute top-8 left-8 p-2 bg-white/5 rounded-full hover:bg-red-600 transition-all"><X size={20} /></button>

                        <div className="flex flex-col items-center mt-12 space-y-4">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[#e11d48] to-[#be123c] p-1 shadow-2xl">
                                <img src={selectedUser.avatar} className="w-full h-full rounded-[2.2rem] bg-black" alt={selectedUser.name} />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter">{selectedUser.name}</h2>
                                <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{selectedUser.id}</p>
                            </div>
                        </div>

                        <div className="mt-12 space-y-6 flex-1">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Contact Information</p>
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#e11d48]/10 group-hover:text-[#e11d48] transition-all"><Mail size={18} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-black uppercase">Email Address</p>
                                        <p className="text-sm font-bold">{selectedUser.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#e11d48]/10 group-hover:text-[#e11d48] transition-all"><Phone size={18} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-black uppercase">Phone Number</p>
                                        <p className="text-sm font-bold">{selectedUser.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Account Overview</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-3xl">
                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Join Date</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar size={14} className="text-[#e11d48]" />
                                            <p className="text-xs font-bold">{selectedUser.joinedDate}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-3xl">
                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Bookings</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Ticket size={14} className="text-[#e11d48]" />
                                            <p className="text-xs font-bold">12 Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Change Role</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Customer', 'Staff', 'Admin'].map(role => (
                                        <button
                                            key={role}
                                            onClick={() => updateRole(selectedUser.id, role)}
                                            className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedUser.role === role ? 'bg-[#e11d48] text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'
                                                }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex gap-4">
                            <button
                                onClick={() => toggleUserStatus(selectedUser.id)}
                                className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${selectedUser.status === 'Active' ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-green-500 text-black hover:bg-green-400'
                                    }`}
                            >
                                {selectedUser.status === 'Active' ? 'Suspend Account' : 'Reactivate'}
                            </button>
                            <button
                                onClick={() => deleteUser(selectedUser.id)}
                                className="p-4 bg-red-600/10 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const X = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);