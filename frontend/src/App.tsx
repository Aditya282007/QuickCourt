import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { VenuesPage } from './pages/VenuesPage';
import { SingleVenuePage } from './pages/SingleVenuePage';
import Spline from '@splinetool/react-spline';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-premium-black">
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/venue/:id" element={<SingleVenuePage />} />
            <Route path='/contact' element={
              <Spline
                scene="https://prod.spline.design/2LSWXFl2E4Nej8Zm/scene.splinecode"
              />
            } />
          </Routes>
        </AnimatePresence>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;