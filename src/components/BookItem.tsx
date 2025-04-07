
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface BookItemProps {
  id: string;
  title: string;
  authors: string[];
  callNumber?: string;
  status?: 'Available' | 'Checked out';
  dueDate?: string;
  coverImage?: string;
}

const BookItem: React.FC<BookItemProps> = ({
  id,
  title,
  authors,
  callNumber,
  status = 'Available',
  dueDate,
  coverImage,
}) => {
  return (
    <Link to={`/books/${id}`} className="book-item block">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-16 h-20 bg-gray-200 mr-4 overflow-hidden rounded">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <BookOpen size={24} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-library-heading truncate">{title}</h3>
          <p className="text-sm text-library-text mt-1">
            {authors.join(', ')}
          </p>
          
          {callNumber && (
            <p className="text-xs text-library-secondary mt-1">
              Call number: {callNumber}
            </p>
          )}
          
          <div className="mt-2 flex items-center">
            <Badge 
              variant={status === 'Available' ? 'outline' : 'secondary'}
              className={`text-xs ${status === 'Available' ? 'text-green-600 border-green-600' : 'text-amber-600'}`}
            >
              {status}
            </Badge>
            
            {dueDate && status === 'Checked out' && (
              <span className="text-xs text-library-secondary ml-2">
                Due: {dueDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
