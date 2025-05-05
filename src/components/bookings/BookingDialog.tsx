
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MultiPassengerBookingForm from './MultiPassengerBookingForm';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
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

const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  flightId,
  flightDetails
}) => {
  const handleBookingComplete = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Book Flight {flightId}</DialogTitle>
          <DialogDescription>
            Enter passenger details to complete your booking
          </DialogDescription>
        </DialogHeader>
        
        <MultiPassengerBookingForm
          flightId={flightId}
          flightDetails={flightDetails}
          onBookingComplete={handleBookingComplete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
