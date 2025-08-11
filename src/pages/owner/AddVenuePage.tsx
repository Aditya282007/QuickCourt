import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload, MapPin, DollarSign } from 'lucide-react';
import { getCurrentUser } from '../../utils/auth';

const AddVenuePage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    sports: [] as string[],
    amenities: [] as string[],
    images: [] as string[]
  });
  
  const [courts, setCourts] = useState([
    { id: '1', name: '', sport: '', pricePerHour: 0 }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [newSport, setNewSport] = useState('');
  const [newAmenity, setNewAmenity] = useState('');

  const availableSports = ['Football', 'Basketball', 'Tennis', 'Badminton', 'Cricket', 'Table Tennis', 'Squash', 'Hockey'];
  const availableAmenities = ['Parking', 'Changing Rooms', 'Cafeteria', 'Equipment Rental', 'AC', 'Locker Rooms', 'Pro Shop', 'Floodlights', 'Spectator Stands', 'Restaurant'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, e.target?.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addSport = () => {
    if (newSport && !formData.sports.includes(newSport)) {
      setFormData(prev => ({
        ...prev,
        sports: [...prev.sports, newSport]
      }));
      setNewSport('');
    }
  };

  const removeSport = (sport: string) => {
    setFormData(prev => ({
      ...prev,
      sports: prev.sports.filter(s => s !== sport)
    }));
  };

  const addAmenity = () => {
    if (newAmenity && !formData.amenities.includes(newAmenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const addCourt = () => {
    setCourts(prev => [
      ...prev,
      { id: Date.now().toString(), name: '', sport: '', pricePerHour: 0 }
    ]);
  };

  const removeCourt = (id: string) => {
    setCourts(prev => prev.filter(court => court.id !== id));
  };

  const updateCourt = (id: string, field: string, value: string | number) => {
    setCourts(prev =>
      prev.map(court =>
        court.id === id ? { ...court, [field]: value } : court
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    // Create venue object
    const venue = {
      id: Date.now().toString(),
      ...formData,
      ownerId: user.id,
      ownerName: user.name,
      ownerEmail: user.email,
      courts: courts.filter(court => court.name && court.sport),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      rating: 0,
      pricePerHour: Math.min(...courts.map(c => c.pricePerHour).filter(p => p > 0)),
      reviews: []
    };

    // Save to localStorage (in real app, this would be an API call)
    const existingVenues = JSON.parse(localStorage.getItem('pendingVenues') || '[]');
    localStorage.setItem('pendingVenues', JSON.stringify([...existingVenues, venue]));

    // Add notification for user
    const notification = {
      id: Date.now().toString(),
      userId: user.id,
      type: 'general',
      title: 'Venue Submitted for Review',
      message: `Your venue "${venue.name}" has been submitted for admin approval.`,
      read: false,
      createdAt: new Date().toISOString()
    };

    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify([...existingNotifications, notification]));

    setTimeout(() => {
      setLoading(false);
      alert('Venue submitted successfully! It will be reviewed by our admin team.');
      navigate('/owner/venues');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/owner/venues')}
          className="flex items-center space-x-2 text-gray-400 hover:text-[#C5A880] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to My Venues</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Add New Venue</h1>
          <p className="text-gray-400 mb-8">Submit your venue for admin approval</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-white text-xl font-semibold">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                    placeholder="Enter venue name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent resize-none"
                  placeholder="Describe your venue..."
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <h3 className="text-white text-xl font-semibold">Venue Images</h3>
              
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-8 bg-white/10 border-2 border-dashed border-white/20 rounded-xl text-gray-300 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Upload className="w-6 h-6" />
                  <span>Upload Venue Images</span>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Venue ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sports */}
            <div className="space-y-6">
              <h3 className="text-white text-xl font-semibold">Sports Offered</h3>
              
              <div className="flex space-x-2">
                <select
                  value={newSport}
                  onChange={(e) => setNewSport(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                >
                  <option value="" className="bg-gray-900">Select a sport</option>
                  {availableSports.filter(sport => !formData.sports.includes(sport)).map(sport => (
                    <option key={sport} value={sport} className="bg-gray-900">{sport}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addSport}
                  className="px-4 py-3 bg-[#C5A880] text-black rounded-xl hover:bg-[#D4B897] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.sports.map(sport => (
                  <span
                    key={sport}
                    className="flex items-center space-x-2 px-3 py-1 bg-[#C5A880]/20 text-[#C5A880] rounded-lg border border-[#C5A880]/30"
                  >
                    <span>{sport}</span>
                    <button
                      type="button"
                      onClick={() => removeSport(sport)}
                      className="text-[#C5A880] hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
              <h3 className="text-white text-xl font-semibold">Amenities</h3>
              
              <div className="flex space-x-2">
                <select
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                >
                  <option value="" className="bg-gray-900">Select an amenity</option>
                  {availableAmenities.filter(amenity => !formData.amenities.includes(amenity)).map(amenity => (
                    <option key={amenity} value={amenity} className="bg-gray-900">{amenity}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addAmenity}
                  className="px-4 py-3 bg-[#C5A880] text-black rounded-xl hover:bg-[#D4B897] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.amenities.map(amenity => (
                  <span
                    key={amenity}
                    className="flex items-center space-x-2 px-3 py-1 bg-white/10 text-gray-300 rounded-lg border border-white/20"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="text-gray-300 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Courts */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-semibold">Courts</h3>
                <button
                  type="button"
                  onClick={addCourt}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 rounded-xl hover:bg-[#C5A880]/30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Court</span>
                </button>
              </div>

              <div className="space-y-4">
                {courts.map((court, index) => (
                  <div key={court.id} className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-medium">Court {index + 1}</h4>
                      {courts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCourt(court.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Court Name</label>
                        <input
                          type="text"
                          value={court.name}
                          onChange={(e) => updateCourt(court.id, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                          placeholder="e.g., Court A"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Sport</label>
                        <select
                          value={court.sport}
                          onChange={(e) => updateCourt(court.id, 'sport', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                        >
                          <option value="" className="bg-gray-900">Select sport</option>
                          {formData.sports.map(sport => (
                            <option key={sport} value={sport} className="bg-gray-900">{sport}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm mb-2">Price per Hour</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            min="0"
                            value={court.pricePerHour}
                            onChange={(e) => updateCourt(court.id, 'pricePerHour', parseInt(e.target.value) || 0)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#C5A880] to-[#B8956F] text-black font-semibold px-8 py-4 rounded-xl hover:from-[#D4B897] hover:to-[#C5A880] transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit for Approval</span>
                  </>
                )}
              </motion.button>

              <button
                type="button"
                onClick={() => navigate('/owner/venues')}
                className="px-8 py-4 bg-white/10 text-gray-300 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddVenuePage;