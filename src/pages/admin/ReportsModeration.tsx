import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, X, Eye, Flag, User, Building } from 'lucide-react';
import { flaggedItems } from '../../data/adminData';
import { FlaggedItem } from '../../types/admin';

const ReportsModeration = () => {
  const [items, setItems] = useState(flaggedItems);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredItems = items.filter(item => {
    const matchesStatus = filter === 'all' || item.status === filter;
    const matchesSeverity = severityFilter === 'all' || item.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const handleAction = (itemId: string, action: 'resolved' | 'dismissed') => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, status: action } : item
      )
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'low':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'resolved':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'dismissed':
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'facility':
        return Building;
      case 'user':
        return User;
      default:
        return Flag;
    }
  };

  const pendingCount = items.filter(item => item.status === 'pending').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports & Moderation</h1>
          <p className="text-gray-400">Review flagged content and user reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl border border-red-500/30">
            <span className="font-medium">{pendingCount} Pending</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Filter */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
            >
              <option value="all" className="bg-gray-900">All Status</option>
              <option value="pending" className="bg-gray-900">Pending</option>
              <option value="resolved" className="bg-gray-900">Resolved</option>
              <option value="dismissed" className="bg-gray-900">Dismissed</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Severity</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-transparent"
            >
              <option value="all" className="bg-gray-900">All Severity</option>
              <option value="high" className="bg-gray-900">High</option>
              <option value="medium" className="bg-gray-900">Medium</option>
              <option value="low" className="bg-gray-900">Low</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Flagged Items */}
      <div className="space-y-6">
        {filteredItems.map((item, index) => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{item.targetName}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      Reported by {item.reportedBy} • {new Date(item.reportedAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                        {item.severity.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                      <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs rounded-lg border border-white/20">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {item.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(item.id, 'resolved')}
                      className="flex items-center space-x-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl px-4 py-2 hover:bg-green-500/30 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Resolve</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(item.id, 'dismissed')}
                      className="flex items-center space-x-2 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-xl px-4 py-2 hover:bg-gray-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Dismiss</span>
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <h4 className="text-white font-medium mb-2">Reason: {item.reason}</h4>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  Report ID: {item.id} • Target ID: {item.targetId}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-[#C5A880] hover:text-[#D4B897] transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
              <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">No reports found</h3>
              <p className="text-gray-400">
                {filter === 'all' 
                  ? "No flagged items at the moment."
                  : `No ${filter} reports found.`
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-red-400 text-2xl font-bold mb-2">
            {items.filter(i => i.status === 'pending').length}
          </h3>
          <p className="text-gray-300">Pending Reports</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-green-400 text-2xl font-bold mb-2">
            {items.filter(i => i.status === 'resolved').length}
          </h3>
          <p className="text-gray-300">Resolved</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-yellow-400 text-2xl font-bold mb-2">
            {items.filter(i => i.severity === 'high').length}
          </h3>
          <p className="text-gray-300">High Priority</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-[#C5A880] text-2xl font-bold mb-2">{items.length}</h3>
          <p className="text-gray-300">Total Reports</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsModeration;