import React, { useState, useEffect } from 'react';
import { Calendar, Car, User, Phone } from 'lucide-react';
import { ParkingSlot, ReservationData } from '../types';
import { fetchSlots, reserveSlot } from '../api/parkingApi';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const Reserve: React.FC = () => {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState<ReservationData>({
    user_name: '',
    vehicle_number: '',
    slot_id: ''
  });

  const [errors, setErrors] = useState<Partial<ReservationData>>({});

  useEffect(() => {
    const loadSlots = async () => {
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
      }
    };

    loadSlots();
  }, []);

  const availableSlots = selectedZone === 'all'
    ? slots.filter(slot => slot.status === 'available')
    : slots.filter(slot => slot.status === 'available' && slot.zone === selectedZone);

  const zones = ['all', 'A', 'B', 'C', 'D'];

  const validateForm = (): boolean => {
    const newErrors: Partial<ReservationData> = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    }

    if (!formData.vehicle_number.trim()) {
      newErrors.vehicle_number = 'Vehicle number is required';
    } else if (!/^[A-Z0-9\s-]+$/i.test(formData.vehicle_number.trim())) {
      newErrors.vehicle_number = 'Please enter a valid vehicle number';
    }

    if (!formData.slot_id) {
      newErrors.slot_id = 'Please select a parking slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await reserveSlot(formData);
      
      if (response.success) {
        setNotification({
          type: 'success',
          message: response.message
        });
        
        // Reset form
        setFormData({
          user_name: '',
          vehicle_number: '',
          slot_id: ''
        });
        
        // Refresh slots data
        const slotsResponse = await fetchSlots();
        if (slotsResponse.success && slotsResponse.data) {
          setSlots(slotsResponse.data);
        }
      } else {
        setNotification({
          type: 'error',
          message: response.message
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to reserve parking slot. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReservationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getZoneColor = (zone: string) => {
    const colors = {
      A: 'text-blue-600',
      B: 'text-purple-600',
      C: 'text-orange-600',
      D: 'text-pink-600'
    };
    return colors[zone as keyof typeof colors] || 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading available slots...</span>
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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <Calendar className="w-8 h-8 mr-3 text-blue-600" />
          Reserve Parking Slot
        </h1>
        <p className="text-gray-600 mt-2">Book your parking space in advance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Reservation Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Reservation Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.user_name}
                onChange={(e) => handleInputChange('user_name', e.target.value)}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.user_name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.user_name && (
                <p className="text-red-600 text-sm mt-1">{errors.user_name}</p>
              )}
            </div>

            {/* Vehicle Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Car className="w-4 h-4 inline mr-2" />
                Vehicle Number
              </label>
              <input
                type="text"
                value={formData.vehicle_number}
                onChange={(e) => handleInputChange('vehicle_number', e.target.value.toUpperCase())}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.vehicle_number ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., ABC 123"
              />
              {errors.vehicle_number && (
                <p className="text-red-600 text-sm mt-1">{errors.vehicle_number}</p>
              )}
            </div>

            {/* Zone Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Zone
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Zones</option>
                {zones.slice(1).map(zone => (
                  <option key={zone} value={zone}>Zone {zone}</option>
                ))}
              </select>
            </div>

            {/* Slot Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Parking Slot
              </label>
              {availableSlots.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Car className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  No available slots in selected zone
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
                  {availableSlots.map((slot) => (
                    <label
                      key={slot.id}
                      className={`cursor-pointer border-2 rounded-lg p-3 text-center transition-all duration-200 hover:shadow-md ${
                        formData.slot_id === slot.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot_id"
                        value={slot.id}
                        checked={formData.slot_id === slot.id}
                        onChange={(e) => handleInputChange('slot_id', e.target.value)}
                        className="sr-only"
                      />
                      <div className="font-semibold text-gray-900">{slot.slot_number}</div>
                      <div className={`text-xs font-medium ${getZoneColor(slot.zone)}`}>
                        Zone {slot.zone}
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {errors.slot_id && (
                <p className="text-red-600 text-sm mt-1">{errors.slot_id}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || availableSlots.length === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Reserving...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  Reserve Slot
                </>
              )}
            </button>
          </form>
        </div>

        {/* Available Slots Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Slots</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{availableSlots.length}</div>
                <div className="text-green-800 text-sm">Available Now</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{slots.length}</div>
                <div className="text-blue-800 text-sm">Total Slots</div>
              </div>
            </div>

            <div className="space-y-3">
              {zones.slice(1).map(zone => {
                const zoneSlots = slots.filter(slot => slot.zone === zone);
                const zoneAvailable = zoneSlots.filter(slot => slot.status === 'available').length;
                return (
                  <div key={zone} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className={`font-medium ${getZoneColor(zone)}`}>Zone {zone}</span>
                    <span className="text-gray-600">
                      {zoneAvailable}/{zoneSlots.length} available
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 mb-2">Important Notes</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Reservations are valid for 2 hours</li>
              <li>• Late arrivals may result in slot release</li>
              <li>• Contact support for any assistance</li>
              <li>• Keep your vehicle documents ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;