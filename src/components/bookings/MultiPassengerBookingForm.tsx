
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PassengerForm from './PassengerForm';
import FlightDetails from './FlightDetails';
import BookingSummary from './BookingSummary';
import PassengerCountSelector from './PassengerCountSelector';
import { useBookingForm } from '@/hooks/useBookingForm';

interface MultiPassengerBookingFormProps {
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
  onBookingComplete: () => void;
}

const MultiPassengerBookingForm: React.FC<MultiPassengerBookingFormProps> = ({
  flightId,
  flightDetails,
  onBookingComplete
}) => {
  const {
    passengerCount,
    setPassengerCount,
    passengers,
    handlePassengerChange,
    addPassenger,
    removePassenger,
    isBooking,
    walletBalance,
    totalPrice,
    insufficientBalance,
    handleSubmit
  } = useBookingForm({
    flightId,
    flightDetails,
    onBookingComplete
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FlightDetails flightId={flightId} flightDetails={flightDetails} />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Passenger Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter details for all passengers (maximum 6)
            </p>
          </div>
          
          <PassengerCountSelector 
            passengerCount={passengerCount}
            setPassengerCount={setPassengerCount}
            addPassenger={addPassenger}
            maxPassengers={6}
          />
        </div>
        
        {passengers.map((passenger, index) => (
          <PassengerForm
            key={index}
            passenger={passenger}
            index={index}
            onChange={handlePassengerChange}
            onRemove={removePassenger}
            canRemove={passengers.length > 1}
            isMainPassenger={index === 0}
          />
        ))}
      </div>
      
      <BookingSummary
        flightId={flightId}
        flightDetails={flightDetails}
        passengersCount={passengers.length}
        walletBalance={walletBalance}
      />
      
      {insufficientBalance && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Insufficient Balance</AlertTitle>
          <AlertDescription>
            Your wallet balance is insufficient for this booking. Please add funds to your wallet.
          </AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-primary-color hover:bg-primary-color/90"
        disabled={isBooking || insufficientBalance}
      >
        {isBooking ? 'Processing...' : `Confirm Booking for ${passengers.length} Passenger${passengers.length > 1 ? 's' : ''}`}
      </Button>
    </form>
  );
};

export default MultiPassengerBookingForm;
