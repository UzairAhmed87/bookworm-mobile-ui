
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import MobileFooter from '@/components/MobileFooter';
import { Clock, AlertTriangle, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

// Sample borrowed books
const borrowedBooks = [
  {
    id: '3',
    title: 'Probability and Statistics for Engineers and Scientists',
    authors: ['Walpole, Ronald E', 'Myers, Raymond H'],
    coverImage: '/lovable-uploads/d42045ef-199f-499c-8c42-4d2c9fc4b558.png',
    dueDate: '20/06/2025',
    callNumber: '519.2 WAL',
    isOverdue: false
  }
];

const BorrowedBooksPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mobile-container">
      <MobileHeader 
        title="My Borrowed Books"
        showBackButton={true}
        onSearchClick={() => navigate('/search')}
        onProfileClick={() => navigate('/profile')}
      />
      
      <div className="p-4">
        {borrowedBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-library-text">You don't have any borrowed books</p>
            <Button 
              className="mt-4"
              onClick={() => navigate('/search')}
            >
              Browse Library
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Currently Borrowed</h2>
              <span className="text-sm text-library-secondary">{borrowedBooks.length} items</span>
            </div>
            
            {borrowedBooks.map((book) => (
              <div key={book.id} className="border rounded-lg mb-4 overflow-hidden">
                <div className="p-3 flex items-start">
                  <div className="flex-shrink-0 w-16 h-20 bg-gray-200 mr-3 overflow-hidden rounded">
                    {book.coverImage ? (
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <BookOpen size={24} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-library-heading truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-library-text mt-1">
                      {book.authors.join(', ')}
                    </p>
                    <p className="text-xs text-library-secondary mt-1">
                      Call number: {book.callNumber}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-3 flex justify-between items-center bg-gray-50">
                  <div className="flex items-center">
                    {book.isOverdue ? (
                      <AlertTriangle size={16} className="text-red-500 mr-1" />
                    ) : (
                      <Clock size={16} className="text-library-secondary mr-1" />
                    )}
                    <span className={`text-sm ${book.isOverdue ? 'text-red-500 font-medium' : ''}`}>
                      Due: {book.dueDate}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => {}}
            >
              Renew All Items
            </Button>
          </>
        )}
      </div>
      
      <MobileFooter />
    </div>
  );
};

export default BorrowedBooksPage;
