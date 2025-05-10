
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  variant?: 'default' | 'hero';
}

export default function SearchBar({ 
  className = '', 
  placeholder = 'Search for flights...', 
  variant = 'default' 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/flights?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex items-center w-full ${className} ${
        variant === 'hero' ? 'max-w-2xl mx-auto' : 'max-w-md'
      }`}
    >
      <div className={`relative flex-grow ${theme === 'dark' ? 'shadow-md' : 'shadow-lg'}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className={`pl-10 pr-4 py-3 rounded-l-lg border-r-0 focus-visible:ring-airline-blue ${
            variant === 'hero' ? 'h-14 text-lg' : 'h-10'
          } ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
        />
      </div>
      <Button 
        type="submit" 
        className={`rounded-r-lg bg-airline-blue hover:bg-airline-navy ${
          variant === 'hero' ? 'h-14 px-6 text-lg' : 'h-10'
        }`}
      >
        Search
      </Button>
    </form>
  );
}
