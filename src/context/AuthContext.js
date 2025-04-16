
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userInfoString = await AsyncStorage.getItem('userInfo');
        
        if (token && userInfoString) {
          setUserToken(token);
          setUserInfo(JSON.parse(userInfoString));
        }
      } catch (e) {
        console.log('Failed to load auth info', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    // In a real app, replace with actual API call
    setIsLoading(true);
    
    try {
      // Mock login - replace with real authentication
      const mockUserInfo = {
        id: '1',
        name: 'Test User',
        email: email,
        borrowedBooks: 1,
        overdueBooks: 0,
        fineDue: '₹0.00',
      };
      
      const mockToken = 'mock-token-xxx';
      
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      
      setUserToken(mockToken);
      setUserInfo(mockUserInfo);
    } catch (e) {
      console.log('Login error', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    // Simulate API call
    setIsLoading(true);
    
    try {
      // Mock registration - replace with real registration API
      const mockUserInfo = {
        id: '1',
        name: name,
        email: email,
        borrowedBooks: 0,
        overdueBooks: 0,
        fineDue: '₹0.00',
      };
      
      const mockToken = 'mock-token-xxx';
      
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      
      setUserToken(mockToken);
      setUserInfo(mockUserInfo);
    } catch (e) {
      console.log('Registration error', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      setUserToken(null);
      setUserInfo(null);
    } catch (e) {
      console.log('Logout error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoading, 
      userToken, 
      userInfo, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
