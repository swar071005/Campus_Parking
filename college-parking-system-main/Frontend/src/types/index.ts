export interface ParkingSlot {
  id: string;
  slot_number: string;
  zone: string;
  status: 'available' | 'booked';
}

export interface ReservationData {
  user_name: string;
  vehicle_number: string;
  slot_id: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}