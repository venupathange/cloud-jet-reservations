
import { useFlightLogic } from '@/logic/FlightLogic';
import { Flight } from '@/models/types/flight';

/**
 * Service for handling flight operations
 * Connects UI components with business logic
 */
export const useFlightService = () => {
  const flightLogic = useFlightLogic();
  
  /**
   * Search for flights with optional filters
   * @param from Source location (required)
   * @param to Destination location (optional)
   * @param date Travel date (optional)
   * @param travelClass Travel class (optional)
   */
  const searchFlights = (from?: string, to?: string, date?: string, travelClass?: string) => {
    return flightLogic.getAllFlights(from, to, date);
  };
  
  /**
   * Get all flights
   */
  const getAllFlights = () => {
    return flightLogic.getAllFlights();
  };
  
  /**
   * Get flight by ID
   */
  const getFlightById = (id: string) => {
    return flightLogic.getFlightById(id);
  };
  
  /**
   * Admin operations
   */
  const adminOperations = {
    createFlight: (flightData: Flight) => flightLogic.createFlight(flightData),
    updateFlight: (flightData: Flight) => flightLogic.updateFlight(flightData),
    deleteFlight: (id: string) => flightLogic.deleteFlight(id)
  };
  
  return {
    searchFlights,
    getAllFlights,
    getFlightById,
    adminOperations
  };
};
