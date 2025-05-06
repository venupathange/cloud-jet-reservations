
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
      <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary-color">
            Book Flight {flightId} - {flightDetails.fromCode} to {flightDetails.toCode}
          </DialogTitle>
          <DialogDescription>
            Book for up to 6 passengers - provide complete details for each passenger
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
