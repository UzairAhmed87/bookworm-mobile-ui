
import React from 'react';
import { Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBackButton = false,
  onMenuClick,
  onSearchClick,
  onProfileClick,
}) => {
  return (
    <header className="mobile-header">
      <div className="flex items-center">
        {showBackButton ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => window.history.back()}
            className="mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </Button>
        )}
        <h1 className="text-lg font-medium ml-2 truncate">{title}</h1>
      </div>
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onSearchClick}
        >
          <Search size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onProfileClick}
        >
          <User size={20} />
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;
