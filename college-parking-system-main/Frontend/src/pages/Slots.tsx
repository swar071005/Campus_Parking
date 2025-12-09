import React, { useState, useEffect } from 'react';
import { Car, MapPin, RefreshCw, Filter } from 'lucide-react';
import { ParkingSlot } from '../types';
import { fetchSlots } from '../api/parkingApi';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const Slots: React.FC = () => {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const loadSlots = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetchSlots();
      if (response.success && response.data) {
        setSlots(response.data);
      } else {
        setNotification({
          type: 'error',
          message: response.message || 'Failed to load parking slots'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to load parking slots'
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const filteredSlots = selectedZone === 'all' 
    ? slots 
    : slots.filter(slot => slot.zone === selectedZone);

  const zones = ['all', 'A', 'B', 'C', 'D'];
  const availableCount = filteredSlots.filter(slot => slot.status === 'available').length;
  const occupiedCount = filteredSlots.length - availableCount;

  const getSlotStatusColor = (slot: ParkingSlot) => {
    return slot.status === 'available'
      ? 'bg-green-100 border-green-300 text-green-800' 
      : 'bg-red-100 border-red-300 text-red-800';
  };

  const getZoneColor = (zone: string) => {
    const colors = {
      A: 'bg-blue-100 text-blue-800',
      B: 'bg-purple-100 text-purple-800',
      C: 'bg-orange-100 text-orange-800',
      D: 'bg-pink-100 text-pink-800'
    };
    return colors[zone as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading parking slots...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Car className="w-8 h-8 mr-3 text-blue-600" />
            Parking Slots
          </h1>
          <p className="text-gray-600 mt-2">View and monitor all available parking spaces</p>
        </div>
        
        <button
          onClick={() => loadSlots(true)}
          disabled={refreshing}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors duration-200"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{filteredSlots.length}</div>
              <div className="text-gray-600 text-sm">Total Slots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{availableCount}</div>
              <div className="text-gray-600 text-sm">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{occupiedCount}</div>
              <div className="text-gray-600 text-sm">Occupied</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Zones</option>
              {zones.slice(1).map(zone => (
                <option key={zone} value={zone}>Zone {zone}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSlots.map((slot) => (
          <div
            key={slot.id}
            className={`border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${getSlotStatusColor(slot)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Car className="w-6 h-6 mr-2" />
                <span className="font-bold text-lg">{slot.slot_number}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getZoneColor(slot.zone)}`}>
                Zone {slot.zone}
              </span>
            </div>

            <div className="space-y-2">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                slot.status === 'available'
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  slot.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                {slot.status === 'available' ? 'Available' : 'Booked'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSlots.length === 0 && (
        <div className="text-center py-16">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No slots found</h3>
          <p className="text-gray-600">Try selecting a different zone or refresh the data.</p>
        </div>
      )}
    </div>
  );
};

export default Slots;