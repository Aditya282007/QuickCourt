import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Ban, CheckCircle, Eye, Calendar, DollarSign } from 'lucide-react';
import { adminUsers } from '../../data/adminData';
import { AdminUser } from '../../types/admin';
import UserModal from '../../components/admin/UserModal';

const UserManagement = () => {
  const [users, setUsers] = useState(adminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'owner' | 'admin'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'banned' | 'suspended'>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: 'active' | 'banned' | 'suspended') => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'banned':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'suspended':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'owner':
        return 'text-[#C5A880] bg-[#C5A880]/20 border-[#C5A880]/30';
      case 'user':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage users, owners, and their activities</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-[#C5A880] text-2xl font-bold">{users.length}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="w-5 h-5 text-[#C5A880]" />
          <h3 className="text-white font-semibold">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
            >
              <option value="all" className="bg-gray-900">All Roles</option>
              <option value="user" className="bg-gray-900">Users</option>
              <option value="owner" className="bg-gray-900">Owners</option>
              <option value="admin" className="bg-gray-900">Admins</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
            >
              <option value="all" className="bg-gray-900">All Status</option>
              <option value="active" className="bg-gray-900">Active</option>
              <option value="banned" className="bg-gray-900">Banned</option>
              <option value="suspended" className="bg-gray-900">Suspended</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="text-left text-gray-300 font-medium p-4">User</th>
                <th className="text-left text-gray-300 font-medium p-4">Role</th>
                <th className="text-left text-gray-300 font-medium p-4">Status</th>
                <th className="text-left text-gray-300 font-medium p-4">Activity</th>
                <th className="text-left text-gray-300 font-medium p-4">Stats</th>
                <th className="text-left text-gray-300 font-medium p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="text-gray-300">Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
                      <p className="text-gray-500">Last active {new Date(user.lastActive).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {user.role === 'owner' ? (
                        <p className="text-gray-300">{user.facilities} facilities</p>
                      ) : (
                        <>
                          <p className="text-gray-300">{user.totalBookings} bookings</p>
                          <p className="text-gray-500">${user.totalSpent} spent</p>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-[#C5A880] hover:bg-[#C5A880]/20 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      
                      {user.status === 'active' ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleStatusChange(user.id, 'banned')}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                        >
                          <Ban className="w-4 h-4" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No users found matching your criteria.</p>
          </div>
        )}
      </motion.div>

      {/* User Modal */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default UserManagement;