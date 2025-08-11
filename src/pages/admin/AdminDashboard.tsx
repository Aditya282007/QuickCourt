import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building, Calendar, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import ChartCard from '../../components/admin/ChartCard';
import { adminStats, bookingActivityData, registrationTrendsData, sportsPopularityData } from '../../data/adminData';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: adminStats.totalUsers.toLocaleString(),
      icon: Users,
      change: adminStats.monthlyGrowth.users,
      changeType: 'increase' as const
    },
    {
      title: 'Facility Owners',
      value: adminStats.facilityOwners.toLocaleString(),
      icon: Building,
      change: 8.2,
      changeType: 'increase' as const
    },
    {
      title: 'Total Bookings',
      value: adminStats.totalBookings.toLocaleString(),
      icon: Calendar,
      change: adminStats.monthlyGrowth.bookings,
      changeType: 'increase' as const
    },
    {
      title: 'Active Courts',
      value: adminStats.activeCourts.toLocaleString(),
      icon: Activity,
      change: 5.7,
      changeType: 'increase' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Monitor and manage QuickCourt platform</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Last updated</p>
          <p className="text-white font-medium">{new Date().toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ChartCard
            title="Booking Activity"
            subtitle="Monthly booking trends"
            data={bookingActivityData}
            type="line"
          />
        </motion.div>

        {/* Registration Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChartCard
            title="Registration Trends"
            subtitle="New users and owners"
            data={registrationTrendsData}
            type="line"
          />
        </motion.div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sports Popularity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2"
        >
          <ChartCard
            title="Most Active Sports"
            subtitle="Booking distribution by sport"
            data={sportsPopularityData}
            type="bar"
          />
        </motion.div>

        {/* Revenue Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Revenue Simulation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">This Month</span>
              <span className="text-[#C5A880] font-bold">$124,580</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Last Month</span>
              <span className="text-gray-300">$98,420</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-gray-400">Growth</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">+26.6%</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 mt-4">
              <p className="text-gray-300 text-sm">
                Platform commission (15%): <span className="text-[#C5A880] font-medium">$18,687</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
      >
        <h3 className="text-white font-semibold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 rounded-xl p-4 text-left hover:bg-[#C5A880]/30 transition-colors">
            <h4 className="font-medium mb-1">Pending Approvals</h4>
            <p className="text-sm opacity-80">2 facilities awaiting review</p>
          </button>
          <button className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl p-4 text-left hover:bg-red-500/30 transition-colors">
            <h4 className="font-medium mb-1">Flagged Content</h4>
            <p className="text-sm opacity-80">3 items need attention</p>
          </button>
          <button className="bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl p-4 text-left hover:bg-blue-500/30 transition-colors">
            <h4 className="font-medium mb-1">System Health</h4>
            <p className="text-sm opacity-80">All systems operational</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;