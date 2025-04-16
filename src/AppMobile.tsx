
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import screens
import HomeScreen from './screens/mobile/HomeScreen';
import SearchScreen from './screens/mobile/SearchScreen';
import BookDetailScreen from './screens/mobile/BookDetailScreen';
import BorrowedBooksScreen from './screens/mobile/BorrowedBooksScreen';
import ProfileScreen from './screens/mobile/ProfileScreen';
import NotFoundScreen from './screens/mobile/NotFoundScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const AppMobile = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="BookDetail" component={BookDetailScreen} />
            <Stack.Screen name="Borrowed" component={BorrowedBooksScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default AppMobile;
