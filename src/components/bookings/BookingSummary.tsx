
import React from 'react';
import { Users } from 'lucide-react';

interface BookingSummaryProps {
  flightId: string;
  flightDetails: {
    fromCode: string;
    toCode: string;
    departureDate: string;
    price: number;
    from: string;
    to: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
  };
  passengersCount: number;
  walletBalance: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  flightId,
  flightDetails,
  passengersCount,
  walletBalance
}) => {
  const totalPrice = flightDetails.price * passengersCount;
  const insufficientBalance = walletBalance < totalPrice;
  
  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm mt-6">
      <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Flight</span>
          <span>{flightId}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Route</span>
          <span>{flightDetails.fromCode} → {flightDetails.toCode}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date</span>
          <span>{flightDetails.departureDate}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Passengers</span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {passengersCount}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Price per passenger</span>
          <span>₹{(flightDetails.price * 83).toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 mt-3 flex justify-between items-center">
          <span className="font-semibold">Total Amount</span>
          <span className="font-bold text-lg text-primary">
            ₹{(totalPrice * 83).toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Wallet Balance</span>
          <span className={insufficientBalance ? "text-red-500" : "text-green-600"}>
            ₹{(walletBalance * 83).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
