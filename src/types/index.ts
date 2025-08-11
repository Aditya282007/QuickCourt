export interface Venue {
  id: string;
  name: string;
  image: string;
  rating: number;
  pricePerHour: number;
  location: string;
  sports: string[];
  amenities: string[];
  description: string;
  reviews: Review[];
  courts: Court[];
  ownerId: string;
  ownerName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface Court {
  id: string;
  name: string;
  sport: string;
  pricePerHour: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  courtId: string;
  courtName: string;
  date: string;
  timeSlot: string;
  duration: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'venue_approved' | 'venue_rejected' | 'booking_confirmed' | 'general';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}