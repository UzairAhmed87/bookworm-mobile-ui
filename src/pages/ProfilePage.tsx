
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import MobileFooter from '@/components/MobileFooter';
import { Button } from '@/components/ui/button';
import { 
  User, 
  BookOpen,
  Clock,
  History,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Sample user data
const userData = {
  name: 'ABUL KALAM Library',
  borrowedBooks: 0,
  overdueBooks: 0,
  fineDue: '₹0.00',
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mobile-container">
      <MobileHeader 
        title="Profile"
        showBackButton={true}
        onSearchClick={() => navigate('/search')}
      />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-library-primary rounded-full flex items-center justify-center text-white">
            <User size={32} />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-semibold">{userData.name}</h1>
            <p className="text-sm text-library-secondary">Member since 2023</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border rounded-lg p-3 text-center">
            <p className="text-2xl font-semibold">{userData.borrowedBooks}</p>
            <p className="text-xs text-library-secondary">Borrowed</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <p className="text-2xl font-semibold">{userData.overdueBooks}</p>
            <p className="text-xs text-library-secondary">Overdue</p>
          </div>
          <div className="bg-white border rounded-lg p-3 text-center">
            <p className="text-2xl font-semibold">{userData.fineDue}</p>
            <p className="text-xs text-library-secondary">Fine Due</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left h-12" 
            onClick={() => navigate('/borrowed')}
          >
            <BookOpen size={18} className="mr-3" />
            <span className="flex-1">My Borrowed Books</span>
            <ChevronRight size={16} />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left h-12" 
            onClick={() => navigate('/history')}
          >
            <History size={18} className="mr-3" />
            <span className="flex-1">Borrowing History</span>
            <ChevronRight size={16} />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left h-12" 
            onClick={() => navigate('/reservations')}
          >
            <Clock size={18} className="mr-3" />
            <span className="flex-1">My Reservations</span>
            <ChevronRight size={16} />
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left h-12" 
            onClick={() => navigate('/settings')}
          >
            <Settings size={18} className="mr-3" />
            <span className="flex-1">Settings</span>
            <ChevronRight size={16} />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left h-12" 
            onClick={() => navigate('/help')}
          >
            <HelpCircle size={18} className="mr-3" />
            <span className="flex-1">Help & Support</span>
            <ChevronRight size={16} />
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <Button 
          variant="outline" 
          className="w-full mt-4 text-red-500 border-red-200"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
      
      <MobileFooter />
    </div>
  );
};

export default ProfilePage;
