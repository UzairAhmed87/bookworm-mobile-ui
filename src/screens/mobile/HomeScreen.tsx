
import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MobileHeader from '../../components/mobile/MobileHeader';
import MobileFooterNav from '../../components/mobile/MobileFooterNav';
import BookItem from '../../components/mobile/BookItem';

// Mock data for demonstration
const featuredBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    status: 'Available',
    callNumber: 'F FITZ',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    status: 'Checked out',
    dueDate: 'May 15, 2023',
    callNumber: 'F LEE',
  },
  {
    id: '3',
    title: '1984',
    authors: ['George Orwell'],
    status: 'Available',
    callNumber: 'F ORW',
  }
];

const popularBooks = [
  {
    id: '4',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    authors: ['J.K. Rowling'],
    status: 'Available',
    callNumber: 'YA ROW',
  },
  {
    id: '5',
    title: 'The Hunger Games',
    authors: ['Suzanne Collins'],
    status: 'Checked out',
    dueDate: 'May 20, 2023',
    callNumber: 'YA COL',
  }
];

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MobileHeader title="Library" />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Books</Text>
          <FlatList
            data={featuredBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookItem {...item} />}
            scrollEnabled={false}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Books</Text>
          <FlatList
            data={popularBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookItem {...item} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
});

export default HomeScreen;
