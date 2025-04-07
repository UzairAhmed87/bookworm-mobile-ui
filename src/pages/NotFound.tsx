
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookX } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <BookX size={64} className="mx-auto text-library-primary mb-6" />
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-library-text mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
