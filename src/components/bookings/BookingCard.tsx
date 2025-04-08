
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Calendar, MapPin, User, Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface BookingProps {
  id: string;
  flightId: string;
  userId: string;
  userName: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  onCancel?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const BookingCard: React.FC<BookingProps> = ({
  id,
  flightId,
  userId,
  userName,
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
}) => {
  const { user } = useAuth();
  const isAdmin = user?.userType === 'admin';

  const statusColor = {
    confirmed: "text-green-600 bg-green-100",
    pending: "text-yellow-600 bg-yellow-100",
    cancelled: "text-red-600 bg-red-100",
  }[status];

  const handleDownloadPDF = () => {
    // In a real application, we'd generate a PDF here
    // For now, we'll just show a toast message
    toast({
      title: "Ticket Downloaded",
      description: `Your ticket for flight ${flightId} has been downloaded successfully.`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <div className="lg:col-span-5 p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <Plane className="h-5 w-5 text-airline-blue mr-2" />
                <span className="font-bold text-lg">{flightId}</span>
                <span className="text-gray-500 ml-2">• Cloud Jet Airways</span>
                <span className={`ml-3 text-sm px-2 py-0.5 rounded-full ${statusColor}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <div className="font-bold text-xl text-airline-blue">
                ₹{(price * 83).toFixed(2)}
              </div>
            </div>

            {isAdmin && (
              <div className="mb-4 flex items-center">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                <span className="font-medium">{userName}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div className="space-y-1 mb-4 sm:mb-0">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <div className="flex items-center">
                    <span className="font-bold">{fromCode}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-500">{from}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <div className="flex items-center">
                    <span className="font-bold">{toCode}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-500">{to}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <div className="flex items-center">
                    <span className="font-bold">{departureTime}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-500">{departureDate}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <div className="flex items-center">
                    <span className="font-bold">{arrivalTime}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-500">{arrivalDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 bg-gray-50 flex flex-col justify-center border-t lg:border-t-0 lg:border-l">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onViewDetails && onViewDetails(id)}
              >
                View Details
              </Button>
              
              {status === 'confirmed' && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4 mr-2" /> Download Ticket
                </Button>
              )}
              
              {status !== 'cancelled' && (
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => onCancel && onCancel(id)}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
