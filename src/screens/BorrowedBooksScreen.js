
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookItem from '../components/BookItem';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';

// Sample borrowed books
const borrowedBooks = [
  {
    id: '3',
    title: 'Probability and Statistics for Engineers and Scientists',
    authors: ['Walpole, Ronald E', 'Myers, Raymond H'],
    coverImage: 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    dueDate: '20/06/2025',
    callNumber: '519.2 WAL',
    status: 'Checked out',
    isOverdue: false
  }
];

const BorrowedBooksScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Borrowed Books</Text>
      </View>
      
      {borrowedBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={80} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No Borrowed Books</Text>
          <Text style={styles.emptyDescription}>
            You don't have any books checked out at the moment.
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.browseButtonText}>Browse Library</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{borrowedBooks.length}</Text>
              <Text style={styles.statLabel}>Borrowed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {borrowedBooks.filter(book => book.isOverdue).length}
              </Text>
              <Text style={styles.statLabel}>Overdue</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userInfo?.fineDue || '₹0.00'}</Text>
              <Text style={styles.statLabel}>Fine Due</Text>
            </View>
          </View>
          
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Currently Borrowed</Text>
            <Text style={styles.listCount}>{borrowedBooks.length} items</Text>
          </View>
          
          <FlatList
            data={borrowedBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.bookItem}>
                <BookItem
                  book={item}
                  onPress={() => navigation.navigate('BookDetail', { id: item.id })}
                />
                <View style={styles.bookItemFooter}>
                  <View style={styles.dueContainer}>
                    <Ionicons 
                      name={item.isOverdue ? "alert-circle" : "time-outline"} 
                      size={16} 
                      color={item.isOverdue ? "#ef4444" : "#6b7280"}
                      style={styles.dueIcon}
                    />
                    <Text 
                      style={[
                        styles.dueText,
                        item.isOverdue && styles.overdueText
                      ]}
                    >
                      Due: {item.dueDate}
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => navigation.navigate('BookDetail', { id: item.id })}
                  >
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.booksList}
          />
          
          <TouchableOpacity style={styles.renewButton}>
            <Text style={styles.renewButtonText}>Renew All Items</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  listCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  booksList: {
    paddingBottom: 16,
  },
  bookItem: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueIcon: {
    marginRight: 4,
  },
  dueText: {
    fontSize: 13,
    color: '#6b7280',
  },
  overdueText: {
    color: '#ef4444',
    fontWeight: '500',
  },
  detailsButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
  },
  detailsButtonText: {
    fontSize: 13,
    color: '#6366f1',
  },
  renewButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  renewButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
});

export default BorrowedBooksScreen;
