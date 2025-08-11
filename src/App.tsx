import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import VenuesPage from './pages/VenuesPage';
import SingleVenuePage from './pages/SingleVenuePage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ContactPage from './pages/ContactPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import FacilityApproval from './pages/admin/FacilityApproval';
import UserManagement from './pages/admin/UserManagement';
import ReportsModeration from './pages/admin/ReportsModeration';
import AdminProfile from './pages/admin/AdminProfile';
import AddVenuePage from './pages/owner/AddVenuePage';
import OwnerVenuesPage from './pages/owner/OwnerVenuesPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="facilities" element={<FacilityApproval />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<ReportsModeration />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <div className="min-h-screen bg-[#0D0D0D] font-sans">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/venues" element={<VenuesPage />} />
                <Route path="/venues/:id" element={<SingleVenuePage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/bookings" element={<MyBookingsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/owner/venues" element={<OwnerVenuesPage />} />
                <Route path="/owner/add-venue" element={<AddVenuePage />} />
              </Routes>
            </motion.main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;