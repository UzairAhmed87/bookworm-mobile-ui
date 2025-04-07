
import React, { useState } from 'react';
import MobileHeader from '@/components/MobileHeader';
import MobileFooter from '@/components/MobileFooter';
import SearchBox from '@/components/SearchBox';
import BookItem from '@/components/BookItem';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Sample data for the demo
const featuredBooks = [
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  
  const handleSearch = (query: string) => {
    // In a real app, this would search and update results
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="mobile-container">
      <MobileHeader 
        title="Library App"
        onMenuClick={() => setShowSidebar(true)}
        onSearchClick={() => navigate('/search')}
        onProfileClick={() => navigate('/profile')}
      />
      
      <div className="px-4 py-3">
        <SearchBox onSearch={handleSearch} />
      </div>
      
      <section className="mt-4 px-4">
        <h2 className="text-xl font-semibold mb-3">Recently Added</h2>
        <div className="space-y-4">
          {featuredBooks.slice(0, 2).map(book => (
            <BookItem key={book.id} {...book} />
          ))}
        </div>
      </section>
      
      <section className="mt-6 px-4">
        <h2 className="text-xl font-semibold mb-3">Popular Now</h2>
        <div className="space-y-4">
          {featuredBooks.slice(2, 4).map(book => (
            <BookItem key={book.id} {...book} />
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/search')}
          >
            View More Books
          </Button>
        </div>
      </section>
      
      {/* Sidebar Menu */}
      {showSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSidebar(false)}
          />
          <div className={`sidebar-menu ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Library Menu</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-3">
                <li>
                  <a href="/" className="block p-2 hover:bg-gray-100 rounded">Home</a>
                </li>
                <li>
                  <a href="/search" className="block p-2 hover:bg-gray-100 rounded">Advanced Search</a>
                </li>
                <li>
                  <a href="/borrowed" className="block p-2 hover:bg-gray-100 rounded">My Borrowed Books</a>
                </li>
                <li>
                  <a href="/profile" className="block p-2 hover:bg-gray-100 rounded">Profile & Settings</a>
                </li>
                <li className="border-t pt-3 mt-3">
                  <a href="#" className="block p-2 hover:bg-gray-100 rounded">Library Hours</a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-gray-100 rounded">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-gray-100 rounded">FAQ</a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
      
      <MobileFooter />
    </div>
  );
};

export default HomePage;
