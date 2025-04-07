
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import MobileFooter from '@/components/MobileFooter';
import { Button } from '@/components/ui/button';
import { Share, BookOpen, Clock } from 'lucide-react';

// Sample book details for demo
const bookDetails = {
  id: '1',
  title: 'Vector Mechanics for Engineers Statics and Dynamics',
  authors: ['Beer, Ferdinand P', 'Johnston, E. Russell'],
  publisher: 'New Delhi : Tata McGraw-Hill Publishing',
  year: '2004',
  edition: '7th SI Units',
  description: 'A comprehensive introduction to statics and dynamics for engineering students.',
  isbn: '9780071311137',
  callNumber: '531 BEE',
  materialType: 'Text',
  language: 'English',
  subject: ['Engineering', 'Mechanics', 'Physics'],
  status: 'Available',
  location: 'Book Bank',
  coverImage: '/lovable-uploads/5e31c400-4d27-4399-b21c-b6008dd21cdb.png'
};

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch book details based on the ID
  const book = bookDetails;
  
  return (
    <div className="mobile-container">
      <MobileHeader 
        title="Book Details"
        showBackButton={true}
        onSearchClick={() => navigate('/search')}
        onProfileClick={() => navigate('/profile')}
      />
      
      <div className="p-4">
        <div className="flex mb-4">
          <div className="w-1/3 pr-4">
            <div className="bg-gray-200 rounded overflow-hidden aspect-[3/4]">
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <BookOpen size={40} />
                </div>
              )}
            </div>
          </div>
          
          <div className="w-2/3">
            <h1 className="text-xl font-semibold text-library-heading">{book.title}</h1>
            <p className="text-sm text-library-text mt-1">{book.authors.join(', ')}</p>
            
            <div className="mt-3 flex items-center">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                book.status === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {book.status}
              </div>
            </div>
            
            <div className="mt-3 flex">
              <Button className="mr-2 flex-1">Reserve</Button>
              <Button variant="outline" size="icon">
                <Share size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="book-detail-section">
          <h2 className="text-lg font-medium mb-2">Details</h2>
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-library-secondary">Call Number</div>
              <div className="col-span-2">{book.callNumber}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-library-secondary">Publisher</div>
              <div className="col-span-2">{book.publisher}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-library-secondary">Edition</div>
              <div className="col-span-2">{book.edition}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-library-secondary">Year</div>
              <div className="col-span-2">{book.year}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-library-secondary">Language</div>
              <div className="col-span-2">{book.language}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-library-secondary">ISBN</div>
              <div className="col-span-2">{book.isbn}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-library-secondary">Location</div>
              <div className="col-span-2">{book.location}</div>
            </div>
          </div>
        </div>
        
        <div className="book-detail-section">
          <h2 className="text-lg font-medium mb-2">Subjects</h2>
          <div className="flex flex-wrap">
            {book.subject.map((subject, index) => (
              <div 
                key={index}
                className="mr-2 mb-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
        
        <div className="book-detail-section">
          <h2 className="text-lg font-medium mb-2">Description</h2>
          <p className="text-sm text-library-text">{book.description}</p>
        </div>
        
        <div className="book-detail-section">
          <h2 className="text-lg font-medium mb-2">Similar Books</h2>
          <div className="flex overflow-x-auto pb-2 -mx-1">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-24 flex-shrink-0 mx-1">
                <div className="bg-gray-200 rounded h-32 mb-1"></div>
                <p className="text-xs truncate">Similar Book Title</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <MobileFooter />
    </div>
  );
};

export default BookDetail;
