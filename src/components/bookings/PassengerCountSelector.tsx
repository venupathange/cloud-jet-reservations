
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { UserPlus } from 'lucide-react';

interface PassengerCountSelectorProps {
  passengerCount: number;
  setPassengerCount: (count: number) => void;
  addPassenger: () => void;
  maxPassengers: number;
}

const PassengerCountSelector: React.FC<PassengerCountSelectorProps> = ({
  passengerCount,
  setPassengerCount,
  addPassenger,
  maxPassengers
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-40">
        <Label htmlFor="passenger-count" className="text-sm font-medium mb-1 block">
          Number of Passengers
        </Label>
        <Select 
          value={passengerCount.toString()} 
          onValueChange={(value) => setPassengerCount(parseInt(value))}
        >
          <SelectTrigger id="passenger-count">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Passenger</SelectItem>
            <SelectItem value="2">2 Passengers</SelectItem>
            <SelectItem value="3">3 Passengers</SelectItem>
            <SelectItem value="4">4 Passengers</SelectItem>
            <SelectItem value="5">5 Passengers</SelectItem>
            <SelectItem value="6">6 Passengers</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type="button"
        onClick={addPassenger}
        variant="outline"
        size="sm"
        disabled={passengerCount >= maxPassengers}
        className="flex items-center mt-6"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Add Passenger
      </Button>
    </div>
  );
};

export default PassengerCountSelector;
