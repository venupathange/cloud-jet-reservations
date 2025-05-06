
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface PassengerData {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  passportNumber?: string;
  specialRequests?: string;
  age?: number;
}

interface PassengerFormProps {
  passenger: PassengerData;
  index: number;
  onChange: (index: number, field: keyof PassengerData, value: string | number) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  isMainPassenger?: boolean;
}

// Validation schema
const passengerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  age: z.number().min(1, { message: "Age must be greater than 0" }).optional(),
  passportNumber: z.string().optional(),
  specialRequests: z.string().optional(),
});

const PassengerForm: React.FC<PassengerFormProps> = ({
  passenger,
  index,
  onChange,
  onRemove,
  canRemove,
  isMainPassenger = false
}) => {
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle date of birth change to update age
  const handleDateOfBirthChange = (value: string) => {
    onChange(index, 'dateOfBirth', value);
    if (value) {
      const age = calculateAge(value);
      onChange(index, 'age', age);
    }
  };

  return (
    <div className="border rounded-lg p-6 mb-6 shadow-sm bg-card dark:bg-card-background relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg">
          {isMainPassenger ? "Main Passenger" : `Passenger ${index + 1}`}
        </h3>
        {canRemove && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onRemove(index)}
            className="absolute top-4 right-4 h-8 w-8 rounded-full p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`firstName-${index}`} className="text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id={`firstName-${index}`} 
            value={passenger.firstName} 
            onChange={(e) => onChange(index, 'firstName', e.target.value)}
            placeholder="First Name"
            required
            className="bg-input-background border-border"
          />
          {!passenger.firstName && (
            <p className="text-xs text-red-500">First name is required</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`lastName-${index}`} className="text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id={`lastName-${index}`} 
            value={passenger.lastName} 
            onChange={(e) => onChange(index, 'lastName', e.target.value)}
            placeholder="Last Name"
            required
            className="bg-input-background border-border"
          />
          {!passenger.lastName && (
            <p className="text-xs text-red-500">Last name is required</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`dob-${index}`} className="text-sm font-medium">
            Date of Birth
          </Label>
          <Input 
            id={`dob-${index}`} 
            type="date"
            value={passenger.dateOfBirth || ''} 
            onChange={(e) => handleDateOfBirthChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="bg-input-background border-border"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`age-${index}`} className="text-sm font-medium">
            Age <span className="text-red-500">*</span>
          </Label>
          <Input 
            id={`age-${index}`} 
            type="number"
            min="0"
            value={passenger.age || ''} 
            onChange={(e) => onChange(index, 'age', parseInt(e.target.value) || 0)}
            placeholder="Age"
            required
            className="bg-input-background border-border"
          />
          {(passenger.age === 0 || passenger.age === undefined) && (
            <p className="text-xs text-red-500">Valid age is required</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`gender-${index}`} className="text-sm font-medium">
            Gender <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={passenger.gender} 
            onValueChange={(value: 'male' | 'female' | 'other') => onChange(index, 'gender', value)}
          >
            <SelectTrigger id={`gender-${index}`} className="bg-input-background border-border">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {!passenger.gender && (
            <p className="text-xs text-red-500">Gender selection is required</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`passport-${index}`} className="text-sm font-medium">
            Passport Number
          </Label>
          <Input 
            id={`passport-${index}`} 
            value={passenger.passportNumber || ''} 
            onChange={(e) => onChange(index, 'passportNumber', e.target.value)}
            placeholder="Passport Number"
            className="bg-input-background border-border"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <Label htmlFor={`requests-${index}`} className="text-sm font-medium">
          Special Requests
        </Label>
        <Input 
          id={`requests-${index}`} 
          value={passenger.specialRequests || ''} 
          onChange={(e) => onChange(index, 'specialRequests', e.target.value)}
          placeholder="E.g., Wheelchair assistance, dietary requirements"
          className="bg-input-background border-border"
        />
      </div>
    </div>
  );
};

export default PassengerForm;
