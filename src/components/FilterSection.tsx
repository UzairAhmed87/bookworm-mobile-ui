
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onToggleOption: (id: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selectedOptions,
  onToggleOption,
  isExpanded = false,
  onToggleExpand,
}) => {
  return (
    <div className="border-b pb-3">
      <div 
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={onToggleExpand}
      >
        <h3 className="font-medium">{title}</h3>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </div>
      
      {isExpanded && (
        <div className="pt-2 space-y-2">
          {options.map((option) => (
            <Badge
              key={option.id}
              variant={selectedOptions.includes(option.id) ? "default" : "outline"}
              className="mr-2 mb-2 cursor-pointer"
              onClick={() => onToggleOption(option.id)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
