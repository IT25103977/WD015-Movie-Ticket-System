package com.wd15.model;
    public class PremiumSeat extends Seat {

        private boolean extraLegRoom;
        private double premiumPrice;

        // Constructor
        public PremiumSeat(Long movieId, String seatNumber, String rowLetter, int seatColumn,
                           boolean extraLegRoom, double premiumPrice) {
            super(movieId, seatNumber, rowLetter, seatColumn, "Premium");
            this.extraLegRoom = extraLegRoom;
            this.premiumPrice = premiumPrice;
        }

        // Getters
        public boolean isExtraLegRoom() {
            return extraLegRoom;
        }

        public double getPremiumPrice() {
            return premiumPrice;
        }

        // Override displayStatus() to show PREMIUM + availability
        public void displayStatus() {
            String status = isBooked() ? "Booked" : "Available";
            System.out.println("PREMIUM - " + getSeatNumber() + ": " + status);
        }
    }

