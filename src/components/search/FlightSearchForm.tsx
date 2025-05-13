
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useTheme } from '@/context/ThemeContext';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { format } from 'date-fns';

interface FlightSearchFormProps {
  className?: string;
  variant?: 'default' | 'hero';
}

export default function FlightSearchForm({ 
  className = '', 
  variant = 'default' 
}: FlightSearchFormProps) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [travelClass, setTravelClass] = useState('economy');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (source.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.append('from', source);
      
      if (destination.trim()) {
        searchParams.append('to', destination);
      }
      
      if (date) {
        searchParams.append('date', format(date, 'yyyy-MM-dd'));
      }
      
      searchParams.append('class', travelClass);
      
      navigate(`/dashboard/flights?${searchParams.toString()}`);
    }
  };

  const formClasses = `${
    variant === 'hero' 
      ? 'bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-4xl mx-auto' 
      : 'max-w-md'
  } ${className} ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`;

  return (
    <form onSubmit={handleSearch} className={formClasses}>
      <div className="space-y-4">
        <h2 className={`font-bold ${variant === 'hero' ? 'text-2xl mb-6' : 'text-lg mb-3'}`}>
          Search Flights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source Field (Required) */}
          <div className="relative">
            <label htmlFor="source" className="block text-sm font-medium mb-1">
              From (Required)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="source"
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Enter origin city"
                className={`pl-10 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                required
              />
            </div>
          </div>
          
          {/* Destination Field (Optional) */}
          <div className="relative">
            <label htmlFor="destination" className="block text-sm font-medium mb-1">
              To (Optional)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination city"
                className={`pl-10 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Picker (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Travel Date (Optional)
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'} ${
                    theme === 'dark' ? 'border-gray-700' : ''
                  }`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Class Selection (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Travel Class (Optional)
            </label>
            <Select value={travelClass} onValueChange={setTravelClass}>
              <SelectTrigger className={`w-full ${theme === 'dark' ? 'border-gray-700' : ''}`}>
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium">Premium Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Search Button */}
        <Button 
          type="submit" 
          className={`w-full mt-4 bg-airline-blue hover:bg-airline-navy ${
            variant === 'hero' ? 'h-12 text-lg' : 'h-10'
          }`}
        >
          <Search className="h-5 w-5 mr-2" />
          Search Flights
        </Button>
      </div>
    </form>
  );
}
