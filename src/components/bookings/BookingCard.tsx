
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PassengerInfo } from "@/types/user";

interface BookingCardProps {
  id: string;
  flightId: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
  status: "confirmed" | "pending" | "cancelled";
  onCancel?: () => void;
  onViewDetails?: () => void;
  extraButtons?: React.ReactNode;
  // Add new passenger field
  passengers?: PassengerInfo[];
}

const BookingCard = ({
  id,
  flightId,
  from,
  fromCode,
  to,
  toCode,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  price,
  status,
  onCancel,
  onViewDetails,
  extraButtons,
  passengers
}: BookingCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onViewDetails}
    >
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-lg">{flightId}</h3>
              <p className="text-sm text-gray-500">Booking ID: {id}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                status === "confirmed"
                  ? "bg-green-50 text-green-600"
                  : status === "pending"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {status}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">
                {from} ({fromCode})
              </p>
              <p className="text-sm">
                {departureDate} • {departureTime}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium">
                {to} ({toCode})
              </p>
              <p className="text-sm">
                {arrivalDate} • {arrivalTime}
              </p>
            </div>
          </div>

          {passengers && passengers.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Passengers ({passengers.length})</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {passengers.slice(0, 3).map((passenger, index) => (
                  <span key={passenger.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {passenger.name}
                  </span>
                ))}
                {passengers.length > 3 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    +{passengers.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold text-lg">₹{(price * 83).toFixed(2)}</p>
            <div className="flex space-x-2">
              {status !== "cancelled" && onCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                  }}
                >
                  Cancel
                </Button>
              )}
              {extraButtons}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
