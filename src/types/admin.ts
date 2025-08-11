export interface AdminStats {
  totalUsers: number;
  facilityOwners: number;
  totalBookings: number;
  activeCourts: number;
  monthlyGrowth: {
    users: number;
    bookings: number;
    revenue: number;
  };
}

export interface PendingFacility {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  location: string;
  sports: string[];
  description: string;
  images: string[];
  amenities: string[];
  courts: {
    id: string;
    name: string;
    sport: string;
    pricePerHour: number;
  }[];
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  status: 'active' | 'banned' | 'suspended';
  joinedAt: string;
  lastActive: string;
  totalBookings: number;
  totalSpent: number;
  facilities?: number; // for owners
}

export interface FlaggedItem {
  id: string;
  type: 'facility' | 'user' | 'review';
  targetId: string;
  targetName: string;
  reason: string;
  reportedBy: string;
  reportedAt: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}