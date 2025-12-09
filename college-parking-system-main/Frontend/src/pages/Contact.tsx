import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { ContactMessage } from '../types';
import { submitContactMessage } from '../api/parkingApi';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactMessage>>({});
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: 'Call us for immediate assistance'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'support@collegepark.edu',
      description: 'Send us your queries anytime'
    },
    {
      icon: MapPin,
      title: 'Location',
      info: 'Campus Security Office, Main Building',
      description: 'Visit us during office hours'
    },
    {
      icon: Clock,
      title: 'Hours',
      info: 'Mon - Fri: 8:00 AM - 6:00 PM',
      description: '24/7 emergency support available'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactMessage> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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
      const response = await submitContactMessage(formData);
      
      if (response.success) {
        setNotification({
          type: 'success',
          message: response.message
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setNotification({
          type: 'error',
          message: response.message
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send your message. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactMessage, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

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
          <Phone className="w-8 h-8 mr-3 text-blue-600" />
          Contact Us
        </h1>
        <p className="text-gray-600 mt-2">Get in touch with our support team</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Please describe your inquiry or issue in detail..."
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
              <div className="text-right mt-1">
                <span className={`text-xs ${
                  formData.message.length < 10 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {formData.message.length}/500 characters
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-blue-600 font-medium">{item.info}</p>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">How do I cancel a reservation?</h3>
                <p className="text-gray-600 text-sm">Contact our support team at least 30 minutes before your scheduled time to cancel your reservation.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">What if I'm running late?</h3>
                <p className="text-gray-600 text-sm">Please call us immediately if you're running late. We hold reservations for 15 minutes past the scheduled time.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">Is there a mobile app?</h3>
                <p className="text-gray-600 text-sm">Currently, our system is web-based and mobile-responsive. A native mobile app is in development.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">How do I report a problem?</h3>
                <p className="text-gray-600 text-sm">Use this contact form or call our support line for immediate assistance with any issues.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Need Immediate Help?</h3>
            <div className="space-y-3">
              <a
                href="tel:+15551234567"
                className="flex items-center text-white hover:text-blue-100 transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Support: +1 (555) 123-4567
              </a>
              <a
                href="mailto:support@collegepark.edu"
                className="flex items-center text-white hover:text-blue-100 transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email: support@collegepark.edu
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;