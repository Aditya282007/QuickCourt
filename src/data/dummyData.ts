import { Venue, Booking, TimeSlot } from '../types';

export const dummyVenues: Venue[] = [
  {
    id: '1',
    name: 'Elite Sports Arena',
    image: 'https://images.pexels.com/photos/159832/soccer-football-sports-ball-159832.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    pricePerHour: 45,
    location: 'Downtown District',
    sports: ['Football', 'Basketball', 'Tennis'],
    amenities: ['Parking', 'Changing Rooms', 'Cafeteria', 'Equipment Rental'],
    description: 'Premium sports facility with state-of-the-art courts and professional lighting.',
    ownerId: 'owner-1',
    ownerName: 'John Smith',
    status: 'approved',
    submittedAt: '2024-01-01T00:00:00Z',
    reviews: [
      {
        id: '1',
        userName: 'Alex Johnson',
        rating: 5,
        comment: 'Amazing facilities and great service!',
        date: '2024-01-15'
      }
    ],
    courts: [
      { id: '1', name: 'Court A', sport: 'Football', pricePerHour: 45 },
      { id: '2', name: 'Court B', sport: 'Basketball', pricePerHour: 40 }
    ]
  },
  {
    id: '2',
    name: 'Urban Sports Hub',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    pricePerHour: 35,
    location: 'City Center',
    sports: ['Badminton', 'Table Tennis', 'Squash'],
    amenities: ['AC', 'Parking', 'Locker Rooms', 'Pro Shop'],
    description: 'Modern indoor sports complex perfect for racquet sports.',
    ownerId: 'owner-2',
    ownerName: 'Sarah Johnson',
    status: 'approved',
    submittedAt: '2024-01-02T00:00:00Z',
    reviews: [
      {
        id: '2',
        userName: 'Sarah Mitchell',
        rating: 4,
        comment: 'Good courts, reasonable pricing.',
        date: '2024-01-10'
      }
    ],
    courts: [
      { id: '3', name: 'Court 1', sport: 'Badminton', pricePerHour: 35 },
      { id: '4', name: 'Court 2', sport: 'Table Tennis', pricePerHour: 25 }
    ]
  },
  {
    id: '3',
    name: 'Champions League Complex',
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    pricePerHour: 60,
    location: 'Sports District',
    sports: ['Cricket', 'Football', 'Hockey'],
    amenities: ['Floodlights', 'Spectator Stands', 'Parking', 'Restaurant'],
    description: 'Professional-grade sports complex with tournament-quality facilities.',
    ownerId: 'owner-3',
    ownerName: 'Mike Wilson',
    status: 'approved',
    submittedAt: '2024-01-03T00:00:00Z',
    reviews: [],
    courts: [
      { id: '5', name: 'Main Ground', sport: 'Cricket', pricePerHour: 60 },
      { id: '6', name: 'Practice Net', sport: 'Cricket', pricePerHour: 30 }
    ]
  }
];

export const dummyBookings: Booking[] = [
  {
    id: '1',
    venueId: '1',
    venueName: 'Elite Sports Arena',
    courtId: '1',
    courtName: 'Court A',
    date: '2024-01-20',
    timeSlot: '18:00-19:00',
    duration: 1,
    totalPrice: 45,
    status: 'upcoming'
  },
  {
    id: '2',
    venueId: '2',
    venueName: 'Urban Sports Hub',
    courtId: '3',
    courtName: 'Court 1',
    date: '2024-01-15',
    timeSlot: '16:00-17:00',
    duration: 1,
    totalPrice: 35,
    status: 'completed'
  }
];

export const dummyTimeSlots: TimeSlot[] = [
  { time: '09:00-10:00', available: true, price: 40 },
  { time: '10:00-11:00', available: true, price: 40 },
  { time: '11:00-12:00', available: false, price: 40 },
  { time: '12:00-13:00', available: true, price: 45 },
  { time: '13:00-14:00', available: true, price: 45 },
  { time: '14:00-15:00', available: true, price: 45 },
  { time: '15:00-16:00', available: true, price: 50 },
  { time: '16:00-17:00', available: false, price: 50 },
  { time: '17:00-18:00', available: true, price: 55 },
  { time: '18:00-19:00', available: true, price: 55 },
  { time: '19:00-20:00', available: true, price: 55 },
  { time: '20:00-21:00', available: true, price: 50 }
];