import { AdminStats, PendingFacility, AdminUser, FlaggedItem, ChartData } from '../types/admin';

export const adminStats: AdminStats = {
  totalUsers: 12847,
  facilityOwners: 342,
  totalBookings: 8934,
  activeCourts: 1256,
  monthlyGrowth: {
    users: 12.5,
    bookings: 18.3,
    revenue: 24.7
  }
};

export const pendingFacilities: PendingFacility[] = [
  {
    id: '1',
    name: 'Metro Sports Complex',
    ownerName: 'John Smith',
    ownerEmail: 'john@metrosports.com',
    location: 'Downtown District',
    sports: ['Basketball', 'Tennis', 'Badminton'],
    description: 'State-of-the-art sports complex with premium facilities and professional coaching services.',
    images: [
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159832/soccer-football-sports-ball-159832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Parking', 'Changing Rooms', 'Cafeteria', 'Equipment Rental', 'AC'],
    courts: [
      { id: '1', name: 'Court A', sport: 'Basketball', pricePerHour: 50 },
      { id: '2', name: 'Court B', sport: 'Tennis', pricePerHour: 45 },
      { id: '3', name: 'Court C', sport: 'Badminton', pricePerHour: 35 }
    ],
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Elite Fitness Arena',
    ownerName: 'Sarah Johnson',
    ownerEmail: 'sarah@elitefitness.com',
    location: 'Sports District',
    sports: ['Football', 'Cricket'],
    description: 'Professional sports arena with international standard facilities.',
    images: [
      'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Floodlights', 'Spectator Stands', 'Parking', 'Restaurant'],
    courts: [
      { id: '4', name: 'Main Ground', sport: 'Football', pricePerHour: 80 },
      { id: '5', name: 'Practice Net', sport: 'Cricket', pricePerHour: 40 }
    ],
    submittedAt: '2024-01-14T14:20:00Z',
    status: 'pending'
  }
];

export const adminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'user',
    status: 'active',
    joinedAt: '2023-12-01T00:00:00Z',
    lastActive: '2024-01-15T18:30:00Z',
    totalBookings: 24,
    totalSpent: 1280
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2023-11-15T00:00:00Z',
    lastActive: '2024-01-15T12:45:00Z',
    totalBookings: 0,
    totalSpent: 0,
    facilities: 3
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'user',
    status: 'banned',
    joinedAt: '2023-10-20T00:00:00Z',
    lastActive: '2024-01-10T09:15:00Z',
    totalBookings: 8,
    totalSpent: 420
  }
];

export const flaggedItems: FlaggedItem[] = [
  {
    id: '1',
    type: 'facility',
    targetId: '1',
    targetName: 'Shady Sports Center',
    reason: 'Inappropriate content',
    reportedBy: 'user123',
    reportedAt: '2024-01-14T16:20:00Z',
    description: 'Facility photos contain inappropriate content and misleading information.',
    status: 'pending',
    severity: 'high'
  },
  {
    id: '2',
    type: 'user',
    targetId: '2',
    targetName: 'BadUser456',
    reason: 'Harassment',
    reportedBy: 'user789',
    reportedAt: '2024-01-13T11:30:00Z',
    description: 'User has been harassing other players and using offensive language.',
    status: 'pending',
    severity: 'medium'
  }
];

export const bookingActivityData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Bookings',
      data: [1200, 1900, 3000, 5000, 2000, 3000],
      backgroundColor: 'rgba(197, 168, 128, 0.2)',
      borderColor: '#C5A880',
      fill: true
    }
  ]
};

export const registrationTrendsData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Users',
      data: [400, 600, 800, 1200, 900, 1100],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
      fill: true
    },
    {
      label: 'Owners',
      data: [20, 35, 45, 60, 50, 65],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10B981',
      fill: true
    }
  ]
};

export const sportsPopularityData: ChartData = {
  labels: ['Football', 'Basketball', 'Tennis', 'Badminton', 'Cricket'],
  datasets: [
    {
      label: 'Bookings',
      data: [3200, 2800, 2100, 1800, 1500],
      backgroundColor: [
        'rgba(197, 168, 128, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ]
    }
  ]
};