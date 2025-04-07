
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import MobileFooter from '@/components/MobileFooter';
import SearchBox from '@/components/SearchBox';
import BookItem from '@/components/BookItem';
import FilterSection from '@/components/FilterSection';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Sample data for demo
const searchResults = [
  {
    id: '1',
    title: 'Vector Mechanics for Engineers Statics and Dynamics',
    authors: ['Beer, Ferdinand P', 'Johnston, E. Russell'],
    callNumber: '531 BEE',
    status: 'Available' as const,
    coverImage: '/lovable-uploads/5e31c400-4d27-4399-b21c-b6008dd21cdb.png'
  },
  {
    id: '2',
    title: 'Engineering Mechanics',
    authors: ['Hibbeler, R. C', 'Yap, Kia Beng'],
    callNumber: '519.2 WAL',
    status: 'Available' as const,
  },
  {
    id: '3',
    title: 'Probability and Statistics for Engineers and Scientists',
    authors: ['Walpole, Ronald E', 'Myers, Raymond H'],
    callNumber: '519.2 WAL',
    status: 'Checked out' as const,
    dueDate: '20/06/2025',
    coverImage: '/lovable-uploads/d42045ef-199f-499c-8c42-4d2c9fc4b558.png'
  },
  {
    id: '4',
    title: 'Fibres to Smart Textiles',
    authors: ['Patnaik, Asis', 'Patnaik, Sweta'],
    callNumber: '677 PAT',
    status: 'Available' as const,
    coverImage: '/lovable-uploads/1662d6b7-45e3-4d53-8a64-29205f816800.png'
  }
];

const availabilityOptions = [
  { id: 'available', label: 'Available' },
  { id: 'checkedOut', label: 'Checked Out' }
];

const materialOptions = [
  { id: 'book', label: 'Books' },
  { id: 'journal', label: 'Journals' },
  { id: 'ebook', label: 'E-Books' },
  { id: 'reference', label: 'Reference' }
];

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(searchResults);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['availability']);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    // In a real app, this would fetch actual search results
    console.log('Searching for:', newQuery);
  };

  const toggleFilterExpand = (filterId: string) => {
    setExpandedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleAvailabilityOption = (optionId: string) => {
    setSelectedAvailability(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const toggleMaterialOption = (optionId: string) => {
    setSelectedMaterial(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const applyFilters = () => {
    // In a real app, this would filter results based on selected options
    setShowFilters(false);
    console.log('Applied filters:', { selectedAvailability, selectedMaterial });
  };

  return (
    <div className="mobile-container">
      <MobileHeader 
        title="Search"
        showBackButton={true}
        onSearchClick={() => {}} // No-op since we're already on search page
        onProfileClick={() => navigate('/profile')}
      />
      
      <div className="p-4 border-b">
        <SearchBox 
          onSearch={handleSearch} 
          placeholder="Search books, authors, subjects..."
        />
        
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-library-text">
            {results.length} results {query ? `for "${query}"` : ''}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowFilters(true)}
          >
            <Filter size={14} className="mr-1" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="divide-y">
        {results.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
      
      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="mobile-header border-b">
            <h2 className="text-lg font-medium">Filters</h2>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={applyFilters}
              >
                Apply
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <FilterSection 
              title="Availability"
              options={availabilityOptions}
              selectedOptions={selectedAvailability}
              onToggleOption={toggleAvailabilityOption}
              isExpanded={expandedFilters.includes('availability')}
              onToggleExpand={() => toggleFilterExpand('availability')}
            />
            
            <FilterSection 
              title="Material Type"
              options={materialOptions}
              selectedOptions={selectedMaterial}
              onToggleOption={toggleMaterialOption}
              isExpanded={expandedFilters.includes('material')}
              onToggleExpand={() => toggleFilterExpand('material')}
            />
          </div>
        </div>
      )}
      
      <MobileFooter />
    </div>
  );
};

export default SearchPage;
