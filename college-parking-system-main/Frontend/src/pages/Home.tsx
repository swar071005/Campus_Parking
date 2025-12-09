import React, { useState, useEffect } from 'react';
import { Car, MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStats } from '../api/parkingApi';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    occupancyRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const features = [
    {
      title: 'Real-time Availability',
      description: 'View live parking slot availability across all campus zones',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Easy Reservation',
      description: 'Reserve your parking spot in advance with just a few clicks',
      icon: Car,
      color: 'text-green-600'
    },
    {
      title: 'Multiple Zones',
      description: 'Choose from various parking zones across the campus',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      title: '24/7 Support',
      description: 'Get help anytime with our dedicated support system',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Smart Campus <span className="text-blue-600">Parking</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Streamline your campus parking experience with real-time availability, 
          easy reservations, and intelligent space management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/slots"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Car className="w-5 h-5 mr-2" />
            View Available Slots
          </Link>
          <Link
            to="/reserve"
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
          >
            Reserve a Slot
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
          Parking Statistics
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.totalSlots}</div>
              <div className="text-gray-600 text-sm">Total Slots</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.availableSlots}</div>
              <div className="text-gray-600 text-sm">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.occupiedSlots}</div>
              <div className="text-gray-600 text-sm">Occupied</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.occupancyRate}%</div>
              <div className="text-gray-600 text-sm">Occupancy Rate</div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose CollegePark?</h2>
          <p className="text-gray-600 mt-2">Experience the future of campus parking management</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <Icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Transform Your Parking Experience?
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Join thousands of students and staff who have simplified their campus parking.
        </p>
        <Link
          to="/reserve"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
        >
          Get Started Today
        </Link>
      </div>
    </div>
  );
};

export default Home;