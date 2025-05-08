
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plane, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BookingDialog from '../bookings/BookingDialog';
import { Progress } from "@/components/ui/progress";

interface FlightCardProps {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
  capacity: number;
  availableSeats: number;
  aircraft?: string;
}

const FlightCard: React.FC<FlightCardProps> = (props) => {
  const { isAuthenticated } = useAuth();
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const formattedPrice = (props.price * 83).toFixed(2); // Convert to INR
  
  // Calculate occupancy percentage for progress bar
  const occupancyPercentage = Math.round(((props.capacity - props.availableSeats) / props.capacity) * 100);
  
  // Determine availability status and color
  const getAvailabilityStatus = () => {
    if (props.availableSeats <= 0) {
      return { text: "Sold Out", color: "text-red-600 dark:text-red-400" };
    } else if (props.availableSeats < 5) {
      return { text: "Few Seats Left", color: "text-amber-600 dark:text-amber-400" };
    } else {
      return { text: "Available", color: "text-green-600 dark:text-green-400" };
    }
  };
  
  const availabilityStatus = getAvailabilityStatus();

  // Get the correct class name for the progress indicator based on occupancy
  const getProgressIndicatorClass = () => {
    if (occupancyPercentage >= 90) return "bg-red-500";
    if (occupancyPercentage >= 70) return "bg-amber-500"; 
    return "bg-green-500";
  };

  return (
    <>
      <Card className="overflow-hidden border-border hover:shadow-md transition-shadow duration-300 bg-card dark:bg-card-background">
        <CardContent className="p-0">
          <div className="bg-primary/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Plane className="h-5 w-5 text-primary-color" />
                <span className="font-bold">{props.id}</span>
              </div>
              <span className="text-lg font-bold text-primary-color">₹{formattedPrice}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-semibold">{props.from} ({props.fromCode})</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-semibold">{props.to} ({props.toCode})</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Departure</p>
                  <p className="text-sm">{props.departureDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Departure Time</p>
                  <p className="text-sm">{props.departureTime}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Arrival</p>
                  <p className="text-sm">{props.arrivalDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Arrival Time</p>
                  <p className="text-sm">{props.arrivalTime}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Aircraft</p>
                <p className="text-sm">{props.aircraft || 'Boeing 737'}</p>
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Seats</p>
                  </div>
                  <p className={`text-sm font-medium ${availabilityStatus.color}`}>
                    {availabilityStatus.text} ({props.availableSeats}/{props.capacity})
                  </p>
                </div>
                <Progress 
                  value={occupancyPercentage} 
                  className={`h-2 ${getProgressIndicatorClass()}`} 
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4">
          <Button 
            className="w-full bg-primary-color hover:bg-primary-color/90" 
            onClick={() => setIsBookingDialogOpen(true)}
            disabled={!isAuthenticated || props.availableSeats <= 0}
          >
            {!isAuthenticated 
              ? "Login to Book" 
              : props.availableSeats <= 0 
                ? "Sold Out" 
                : "Book Now"
            }
          </Button>
        </CardFooter>
      </Card>

      <BookingDialog 
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        flightId={props.id}
        flightDetails={{
          from: props.from,
          fromCode: props.fromCode,
          to: props.to,
          toCode: props.toCode,
          departureDate: props.departureDate,
          departureTime: props.departureTime,
          arrivalDate: props.arrivalDate,
          arrivalTime: props.arrivalTime,
          price: props.price
        }}
      />
    </>
  );
};

export default FlightCard;
