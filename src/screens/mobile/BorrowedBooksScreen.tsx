
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MobileHeader from '../../components/mobile/MobileHeader';
import MobileFooterNav from '../../components/mobile/MobileFooterNav';
import BookItem from '../../components/mobile/BookItem';

// Mock data for demonstration
const borrowedBooks = [
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    status: 'Checked out' as const,
    dueDate: 'May 15, 2023',
    callNumber: 'F LEE',
  },
  {
    id: '5',
    title: 'The Hunger Games',
    authors: ['Suzanne Collins'],
    status: 'Checked out' as const,
    dueDate: 'May 20, 2023',
    callNumber: 'YA COL',
  }
];

const BorrowedBooksScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MobileHeader title="My Borrowed Books" />
      
      <View style={styles.content}>
        {borrowedBooks.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Currently Borrowed</Text>
            <FlatList
              data={borrowedBooks}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <BookItem 
                  book={item} 
                  onPress={() => console.log(`Book ${item.id} pressed`)} 
                />
              )}
              contentContainerStyle={styles.bookList}
            />
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Borrowed Books</Text>
            <Text style={styles.emptyText}>
              You don't have any books checked out at the moment.
            </Text>
          </View>
        )}
      </View>
      
      <MobileFooterNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  bookList: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default BorrowedBooksScreen;
