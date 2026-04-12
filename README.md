# Aanantam Resort Booking System

This project is a Node.js-based web application for managing resort bookings, payments, user registrations, and administration for Aanantam Resort. It provides a complete backend and frontend for handling room bookings, payment processing (including Razorpay integration), user management, and more.

## Features

- User registration and login
- Room and package booking
- Payment processing (Razorpay integration)
- Admin panel for managing rooms, users, and bookings
- Booking history and payment records
- Gallery and resort activity pages
- Multiple dining and wellness options
- Responsive frontend with EJS templates and custom CSS

## Project Structure

- `app.js` — Main application entry point
- `routes/` — Express route handlers for bookings, payments, and booking history
- `models/` — Mongoose schemas for users, bookings, payments, and signups
- `public/` — Static assets (CSS, JS, images)
- `views/` — EJS templates for all pages (admin, user, booking, dining, wellness, etc.)
- `utils/` — Utility functions and error handling
- `Razorpay.js` — Razorpay payment integration logic

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- MongoDB (local or cloud instance)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Aanantam-Resort
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI, Razorpay keys, and other secrets as needed:
     ```env
     MONGODB_URI=your_mongodb_uri
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     SESSION_SECRET=your_session_secret
     ```
4. Start the application:
   ```bash
   node app.js
   ```
   Or, for development with auto-reload:
   ```bash
   npm install -g nodemon
   nodemon app.js
   ```

5. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Users can sign up, log in, and book rooms or packages.
- Admins can manage rooms, users, and view booking/payment history via the admin panel.
- Payments are processed securely via Razorpay.

## Technologies Used
- Node.js, Express.js
- MongoDB, Mongoose
- EJS (Embedded JavaScript Templates)
- Razorpay API
- CSS, JavaScript (frontend)

## Folder Overview
- `models/` — Database schemas
- `routes/` — Application routes
- `public/` — Static files (CSS, JS, images)
- `views/` — EJS templates
- `utils/` — Error handling and async wrappers

## License
This project is for educational and demonstration purposes. Please contact the author for commercial use.

---

**Developed by Aanantam Resort Team**
