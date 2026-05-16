import React, { useMemo } from 'react';
import { Ticket, User, CreditCard, Armchair, Clock, Film } from 'lucide-react';

function formatShowDate(date, time) {
  if (!date) return '-';

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = new Date(date).toLocaleDateString('en-LK', options);

  return `${formattedDate} at ${time || ''}`;
}

function formatBookingDate(date) {
  if (!date) return '-';

  return new Date(date).toLocaleString('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export default function TicketHistory({ bookings = [] }) {
  const clearAllBookings = async () => {

    const confirmDelete = window.confirm(
      "Delete ALL bookings permanently from database?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        "http://localhost:8080/api/bookings",
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        alert("All bookings deleted successfully");
        window.location.reload();
      } else {
        alert("Failed to delete bookings");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };
  const totalIncome = useMemo(() => bookings.reduce((sum, b) => sum + (Number(b.grandTotal) || Number(b.payment?.amount) || 0), 0), [bookings]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-end">
          <button
            onClick={clearAllBookings}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest mb-4"
          >
            Delete All Bookings
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Ticket History</h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">All bookings, seats, customer details and payment status</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 px-8 py-5 rounded-2xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-green-500">Total Income</p>
            <p className="text-3xl font-black italic">Rs. {totalIncome.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const movie = booking.show?.movie;
            const cinema = booking.show?.cinema;
            return (
              <div key={booking.id} className="bg-[#121212] border border-white/5 rounded-[2rem] p-7 space-y-6">
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#e11d48]/10 text-[#e11d48] rounded-2xl"><Ticket size={24} /></div>
                    <div>
                      <h3 className="text-xl font-black italic uppercase">WD15-TKT-{String(booking.id).padStart(5, '0')}</h3>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{movie?.title || 'Movie booking'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full">{booking.payment?.status || 'PAID'}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <Info icon={User} label="Customer" value={booking.customerName || booking.user?.name || 'Guest'} sub={booking.email || booking.user?.email} />
                  <Info icon={Film} label="Cinema" value={cinema?.name || booking.cinemaName || '-'} sub={formatShowDate(
                    booking.show?.showDate || booking.date,
                    booking.show?.showTime || booking.time
                  )} />
                  <Info icon={Armchair} label="Seats" value={(booking.seats || []).join(', ') || '-'} sub={`${booking.adults || 0} Adult, ${booking.children || 0} Child`} />
                  <Info icon={CreditCard} label="Payment" value={`Rs. ${(booking.grandTotal || booking.payment?.amount || 0).toLocaleString()}`} sub={booking.payment?.method || 'Credit / Debit Card'} />
                  <Info
                    icon={Clock}
                    label="Booked At"
                    value={formatBookingDate(booking.createdAt || new Date())}
                    sub="Booking Created Time"
                  />
                </div>

                {(booking.foodNames || []).length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Snacks</p>
                    <p className="text-xs font-bold text-gray-300">{booking.foodNames.join(', ')}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {bookings.length === 0 && (
          <div className="py-28 text-center bg-[#121212] border border-dashed border-white/10 rounded-[3rem]">
            <Clock className="mx-auto text-gray-600 mb-4" size={44} />
            <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No ticket bookings yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex gap-4 items-start">
      <Icon size={18} className="text-[#e11d48] shrink-0 mt-1" />
      <div className="min-w-0">
        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{label}</p>
        <p className="font-black uppercase break-words">{value}</p>
        {sub && <p className="text-xs text-gray-500 font-bold mt-1 break-words">{sub}</p>}
      </div>
    </div>
  );
}
