import { ParkingSlot, ReservationData, ContactMessage, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  return data;
};

export const fetchSlots = async (): Promise<ApiResponse<ParkingSlot[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/slots`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch slots');
    }
    
    const slots = await handleResponse(response);
    
    return {
      success: true,
      data: slots,
      message: 'Slots fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch parking slots'
    };
  }
};

export const reserveSlot = async (reservationData: ReservationData): Promise<ApiResponse<ParkingSlot>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData)
    });

    const result = await handleResponse(response);
    
    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to reserve parking slot'
      };
    }

    return {
      success: true,
      message: result.message || 'Parking slot reserved successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to reserve parking slot'
    };
  }
};

export const submitContactMessage = async (contactData: ContactMessage): Promise<ApiResponse<void>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    const result = await handleResponse(response);
    
    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to send your message'
      };
    }

    return {
      success: true,
      message: result.message || 'Your message has been sent successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send your message. Please try again.'
    };
  }
};

export const getStats = async () => {
  try {
    const response = await fetchSlots();
    
    if (!response.success || !response.data) {
      throw new Error('Failed to fetch stats');
    }
    
    const slots = response.data;
    const totalSlots = slots.length;
    const availableSlots = slots.filter(slot => slot.status === 'available').length;
    const occupiedSlots = totalSlots - availableSlots;
    
    return {
      totalSlots,
      availableSlots,
      occupiedSlots,
      occupancyRate: totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0
    };
  } catch (error) {
    return {
      totalSlots: 0,
      availableSlots: 0,
      occupiedSlots: 0,
      occupancyRate: 0
    };
  }
};