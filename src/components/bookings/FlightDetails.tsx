
import React from 'react';

interface FlightDetailsProps {
  flightId: string;
  flightDetails: {
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    price: number;
  };
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flightId, flightDetails }) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg mb-6 shadow-sm">
      <h3 className="font-medium mb-4 text-lg">Flight Details</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Flight</p>
          <p className="font-medium">{flightId}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Price per passenger</p>
          <p className="font-medium">₹{(flightDetails.price * 83).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">From</p>
          <p className="font-medium">{flightDetails.from} ({flightDetails.fromCode})</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">To</p>
          <p className="font-medium">{flightDetails.to} ({flightDetails.toCode})</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Departure</p>
          <p className="font-medium">{flightDetails.departureDate} {flightDetails.departureTime}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Arrival</p>
          <p className="font-medium">{flightDetails.arrivalDate} {flightDetails.arrivalTime}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
