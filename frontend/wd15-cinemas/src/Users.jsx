import React, { useState, useMemo } from 'react';
import { apiPost, apiPut, apiDelete } from './api';
import { Users, UserPlus, Search, Trash2, ShieldCheck, UserCheck, UserMinus, Mail, Phone, Calendar, ArrowUpRight, ChevronLeft, ChevronRight, AlertCircle, Download } from 'lucide-react';

const ROLES = ['All Roles', 'Admin', 'Staff', 'Customer'];
const STATUSES = ['All Status', 'Active', 'Suspended'];

export default function UsersPage({ users = [], setUsers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', phone: '', role: 'Customer' });

  const normalizedUsers = users.map(u => ({
    status: 'Active',
    joinedDate: '2026-05-16',
    lastLogin: 'Just now',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.name || 'User')}`,
    ...u
  }));

  const filteredUsers = useMemo(() => normalizedUsers.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  }), [users, searchTerm, roleFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: normalizedUsers.length,
    admins: normalizedUsers.filter(u => u.role === 'Admin').length,
    active: normalizedUsers.filter(u => u.status === 'Active').length,
    suspended: normalizedUsers.filter(u => u.status === 'Suspended').length
  }), [users]);

  const saveUsers = (next) => typeof setUsers === 'function' && setUsers(next);

  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) return alert('Please enter name, email and password');
    const draft = { ...newUser, status: 'Active', joinedDate: new Date().toISOString().split('T')[0], lastLogin: 'Never', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newUser.name)}` };
    apiPost('/users/signup', draft)
      .then(saved => saveUsers([...users, saved]))
      .catch(() => saveUsers([...users, { ...draft, id: Date.now() }]))
      .finally(() => {
        setNewUser({ name: '', email: '', password: '', phone: '', role: 'Customer' });
        setIsAddingUser(false);
      });
  };

  const updateUser = (id, patch) => {
    const target = normalizedUsers.find(u => u.id === id);
    if (!target) return;
    const updated = { ...target, ...patch };
    saveUsers(users.map(u => u.id === id ? updated : u));
    if (!String(id).startsWith('USR-')) apiPut(`/users/${id}`, updated).catch(() => console.warn('Backend user update failed'));
    if (selectedUser?.id === id) setSelectedUser(updated);
  };

  const toggleUserStatus = (id) => {
    const target = normalizedUsers.find(u => u.id === id);
    if (target) updateUser(id, { status: target.status === 'Active' ? 'Suspended' : 'Active' });
  };

  const deleteUser = (id) => {
    if (!window.confirm('Are you sure you want to remove this user permanently?')) return;
    saveUsers(users.filter(u => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
    if (!String(id).startsWith('USR-')) apiDelete(`/users/${id}`).catch(() => console.warn('Backend user delete failed'));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-[#e11d48]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">User Management</h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Manage roles, permissions, and account statuses</p>
          </div>
          <button onClick={() => setIsAddingUser(!isAddingUser)} className="bg-[#e11d48] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#be123c] transition-all shadow-lg shadow-[#e11d48]/20">
            <UserPlus size={18} /> {isAddingUser ? 'Cancel' : 'Add New User'}
          </button>
        </div>

        {isAddingUser && (
          <div className="bg-[#121212] border border-[#e11d48]/20 p-8 rounded-[2rem] grid md:grid-cols-5 gap-4">
            <input placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} className="bg-black/50 border border-white/5 p-4 rounded-xl" />
            <input placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} className="bg-black/50 border border-white/5 p-4 rounded-xl" />
            <input placeholder="Password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} className="bg-black/50 border border-white/5 p-4 rounded-xl" />
            <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className="bg-black/50 border border-white/5 p-4 rounded-xl"><option>Customer</option><option>Staff</option><option>Admin</option></select>
            <button onClick={addUser} className="bg-green-600 rounded-xl font-black uppercase text-xs">Save User</button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Accounts', val: stats.total, icon: Users, color: 'text-blue-500' },
            { label: 'Admins', val: stats.admins, icon: ShieldCheck, color: 'text-red-500' },
            { label: 'Active Users', val: stats.active, icon: UserCheck, color: 'text-green-500' },
            { label: 'Suspended', val: stats.suspended, icon: UserMinus, color: 'text-yellow-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#121212] border border-white/5 p-6 rounded-[2rem] space-y-2">
              <div className="flex items-center justify-between"><div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}><stat.icon size={20} /></div><ArrowUpRight className="text-gray-700" size={16} /></div>
              <p className="text-3xl font-black">{stat.val}</p><p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#121212] border border-white/5 p-4 rounded-[2rem] flex flex-col lg:flex-row items-center gap-4">
          <div className="relative flex-1 w-full"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input placeholder="Search by name or email..." className="w-full bg-black/50 border border-white/5 pl-14 pr-6 py-4 rounded-2xl outline-none focus:border-[#e11d48]" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
          <select className="bg-black/50 border border-white/5 px-4 py-4 rounded-2xl text-xs font-black uppercase" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>{ROLES.map(r => <option key={r} className="bg-[#121212]">{r}</option>)}</select>
          <select className="bg-black/50 border border-white/5 px-4 py-4 rounded-2xl text-xs font-black uppercase" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>{STATUSES.map(s => <option key={s} className="bg-[#121212]">{s}</option>)}</select>
          <button className="bg-white/5 p-4 rounded-2xl text-gray-400"><Download size={20} /></button>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-[2.5rem] overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b border-white/5"><th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">User Profile</th><th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Account Role</th><th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Status</th><th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Last Activity</th><th className="px-8 py-6 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Actions</th></tr></thead><tbody className="divide-y divide-white/5">
          {filteredUsers.map(user => (
            <tr key={user.id} className={`group hover:bg-white/[0.02] transition-all cursor-pointer ${selectedUser?.id === user.id ? 'bg-white/[0.04]' : ''}`} onClick={() => setSelectedUser(user)}>
              <td className="px-8 py-6"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e11d48] to-[#be123c] p-0.5"><img src={user.avatar} className="w-full h-full rounded-[0.9rem] bg-black" alt={user.name} /></div><div><p className="font-black uppercase text-sm tracking-tight">{user.name}</p><p className="text-[11px] text-gray-500 font-medium">{user.email}</p></div></div></td>
              <td className="px-8 py-6"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${user.role === 'Admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' : user.role === 'Staff' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-white/5 text-gray-400 border-white/10'}`}>{user.role}</span></td>
              <td className="px-8 py-6"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} /><span className="text-[10px] font-black uppercase tracking-widest">{user.status}</span></div></td>
              <td className="px-8 py-6"><p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{user.lastLogin}</p></td>
              <td className="px-8 py-6" onClick={e => e.stopPropagation()}><div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => toggleUserStatus(user.id)} className="p-3 bg-white/5 rounded-xl hover:text-yellow-500">{user.status === 'Active' ? <UserMinus size={16} /> : <UserCheck size={16} />}</button><button onClick={() => deleteUser(user.id)} className="p-3 bg-white/5 rounded-xl hover:bg-red-500/20 hover:text-red-600"><Trash2 size={16} /></button></div></td>
            </tr>
          ))}
        </tbody></table></div>{filteredUsers.length === 0 && <div className="py-20 text-center"><AlertCircle className="mx-auto text-gray-600 mb-3" size={32} /><p className="text-gray-500 font-bold uppercase text-xs tracking-widest">No matching users found</p></div>}</div>

        <div className="flex items-center justify-between px-6"><p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Showing {filteredUsers.length} of {normalizedUsers.length} users</p><div className="flex gap-2"><button className="p-3 bg-white/5 rounded-xl" disabled><ChevronLeft size={16} /></button><button className="p-3 bg-[#e11d48] rounded-xl font-black text-[10px]">1</button><button className="p-3 bg-white/5 rounded-xl"><ChevronRight size={16} /></button></div></div>
      </div>

      {selectedUser && <div className="fixed inset-0 z-[100] flex justify-end"><div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedUser(null)} /><div className="relative w-full max-w-md bg-[#0f0f0f] border-l border-white/10 h-full p-10 flex flex-col"><button onClick={() => setSelectedUser(null)} className="absolute top-8 left-8 p-2 bg-white/5 rounded-full hover:bg-red-600">X</button><div className="flex flex-col items-center mt-12 space-y-4"><img src={selectedUser.avatar} className="w-32 h-32 rounded-[2.2rem] bg-black" alt={selectedUser.name} /><div className="text-center"><h2 className="text-2xl font-black uppercase italic tracking-tighter">{selectedUser.name}</h2><p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{selectedUser.id}</p></div></div><div className="mt-12 space-y-6 flex-1"><p className="text-sm font-bold"><Mail size={16} className="inline mr-2 text-[#e11d48]" />{selectedUser.email}</p><p className="text-sm font-bold"><Phone size={16} className="inline mr-2 text-[#e11d48]" />{selectedUser.phone || '-'}</p><p className="text-sm font-bold"><Calendar size={16} className="inline mr-2 text-[#e11d48]" />{selectedUser.joinedDate}</p><div className="grid grid-cols-3 gap-2">{['Customer', 'Staff', 'Admin'].map(role => <button key={role} onClick={() => updateUser(selectedUser.id, { role })} className={`py-3 rounded-2xl text-[10px] font-black uppercase ${selectedUser.role === role ? 'bg-[#e11d48]' : 'bg-white/5 text-gray-500'}`}>{role}</button>)}</div></div><div className="pt-8 border-t border-white/5 flex gap-4"><button onClick={() => toggleUserStatus(selectedUser.id)} className="flex-1 py-4 rounded-2xl bg-yellow-500 text-black font-black text-xs uppercase">{selectedUser.status === 'Active' ? 'Suspend Account' : 'Reactivate'}</button><button onClick={() => deleteUser(selectedUser.id)} className="p-4 bg-red-600/10 text-red-600 rounded-2xl"><Trash2 size={20} /></button></div></div></div>}
    </div>
  );
}
