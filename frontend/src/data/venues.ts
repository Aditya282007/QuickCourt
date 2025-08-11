export interface Venue {
  id: string;
  name: string;
  sport: string;
  pricePerHour: number;
  location: string;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  sportsOffered: string[];
  gallery: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const venues: Venue[] = [
  {
    id: '1',
    name: 'Elite Sports Arena',
    sport: 'Basketball',
    pricePerHour: 45,
    location: 'Downtown District',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium basketball court with professional-grade facilities and modern amenities.',
    amenities: ['Air Conditioning', 'Sound System', 'Changing Rooms', 'Parking', 'Equipment Rental'],
    sportsOffered: ['Basketball', '3v3 Basketball'],
    gallery: [
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    reviews: [
      { id: '1', userName: 'Mike Johnson', rating: 5, comment: 'Excellent facilities and great atmosphere!', date: '2024-01-15' },
      { id: '2', userName: 'Sarah Chen', rating: 4, comment: 'Well-maintained court, good value for money.', date: '2024-01-10' }
    ]
  },
  {
    id: '2',
    name: 'Green Valley Tennis Club',
    sport: 'Tennis',
    pricePerHour: 35,
    location: 'Green Valley',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beautiful outdoor tennis courts surrounded by nature with professional coaching available.',
    amenities: ['Outdoor Courts', 'Pro Shop', 'Coaching', 'Parking', 'Refreshments'],
    sportsOffered: ['Tennis', 'Tennis Lessons'],
    gallery: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6344089/pexels-photo-6344089.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    reviews: [
      { id: '3', userName: 'David Wilson', rating: 5, comment: 'Perfect courts and beautiful setting!', date: '2024-01-12' }
    ]
  },
  {
    id: '3',
    name: 'Champions Football Field',
    sport: 'Football',
    pricePerHour: 60,
    location: 'Sports Complex',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Full-size football field with professional turf and stadium lighting.',
    amenities: ['Stadium Lighting', 'Professional Turf', 'Changing Rooms', 'Equipment Storage', 'Parking'],
    sportsOffered: ['Football', '7v7 Football'],
    gallery: [
      'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    reviews: [
      { id: '4', userName: 'Team Captain Alex', rating: 5, comment: 'Best field in the city! Amazing experience.', date: '2024-01-14' }
    ]
  },
  {
    id: '4',
    name: 'Aqua Sports Center',
    sport: 'Swimming',
    pricePerHour: 25,
    location: 'Waterfront',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Olympic-sized swimming pool with lanes for competitive swimming and training.',
    amenities: ['Olympic Pool', 'Heated Water', 'Lockers', 'Swim Lessons', 'Parking'],
    sportsOffered: ['Swimming', 'Water Aerobics'],
    gallery: [
      'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    reviews: [
      { id: '5', userName: 'Lisa Rodriguez', rating: 5, comment: 'Clean pool, perfect temperature!', date: '2024-01-11' }
    ]
  },
  {
    id: '5',
    name: 'Badminton Pro Center',
    sport: 'Badminton',
    pricePerHour: 30,
    location: 'City Center',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/8007052/pexels-photo-8007052.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Indoor badminton courts with professional-grade flooring and equipment.',
    amenities: ['Indoor Courts', 'Equipment Rental', 'Air Conditioning', 'Parking', 'Refreshments'],
    sportsOffered: ['Badminton', 'Badminton Training'],
    gallery: [
      'https://images.pexels.com/photos/8007052/pexels-photo-8007052.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    reviews: [
      { id: '6', userName: 'Kevin Park', rating: 4, comment: 'Good courts, reasonable prices.', date: '2024-01-13' }
    ]
  },
  {
    id: '6',
    name: 'Urban Soccer Arena',
    sport: 'Soccer',
    pricePerHour: 50,
    location: 'Urban District',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Indoor soccer arena with artificial turf and modern facilities.',
    amenities: ['Indoor Arena', 'Artificial Turf', 'Scoreboard', 'Parking', 'Equipment Storage'],
    sportsOffered: ['Soccer', '5v5 Soccer'],
    gallery: [
      'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    reviews: [
      { id: '7', userName: 'Carlos Martinez', rating: 5, comment: 'Amazing indoor facility!', date: '2024-01-16' }
    ]
  }
];

export const sports = [
  { name: 'Basketball', icon: '🏀', venues: 4 },
  { name: 'Tennis', icon: '🎾', venues: 3 },
  { name: 'Football', icon: '🏈', venues: 2 },
  { name: 'Soccer', icon: '⚽', venues: 5 },
  { name: 'Swimming', icon: '🏊‍♂️', venues: 2 },
  { name: 'Badminton', icon: '🏸', venues: 3 }
];