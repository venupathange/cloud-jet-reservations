
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export interface PassengerData {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  passportNumber?: string;
  specialRequests?: string;
}

interface PassengerFormProps {
  passenger: PassengerData;
  index: number;
  onChange: (index: number, field: keyof PassengerData, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  passenger,
  index,
  onChange,
  onRemove,
  canRemove
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Passenger {index + 1}</h3>
        {canRemove && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`firstName-${index}`}>First Name *</Label>
          <Input 
            id={`firstName-${index}`} 
            value={passenger.firstName} 
            onChange={(e) => onChange(index, 'firstName', e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
          <Input 
            id={`lastName-${index}`} 
            value={passenger.lastName} 
            onChange={(e) => onChange(index, 'lastName', e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor={`dob-${index}`}>Date of Birth</Label>
          <Input 
            id={`dob-${index}`} 
            type="date"
            value={passenger.dateOfBirth || ''} 
            onChange={(e) => onChange(index, 'dateOfBirth', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor={`gender-${index}`}>Gender</Label>
          <Select 
            value={passenger.gender} 
            onValueChange={(value) => onChange(index, 'gender', value)}
          >
            <SelectTrigger id={`gender-${index}`}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor={`passport-${index}`}>Passport Number</Label>
          <Input 
            id={`passport-${index}`} 
            value={passenger.passportNumber || ''} 
            onChange={(e) => onChange(index, 'passportNumber', e.target.value)}
            placeholder="Passport Number"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Label htmlFor={`requests-${index}`}>Special Requests</Label>
        <Input 
          id={`requests-${index}`} 
          value={passenger.specialRequests || ''} 
          onChange={(e) => onChange(index, 'specialRequests', e.target.value)}
          placeholder="E.g., Wheelchair assistance, dietary requirements"
        />
      </div>
    </div>
  );
};

export default PassengerForm;
