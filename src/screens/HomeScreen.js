
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookItem from '../components/BookItem';
import { StatusBar } from 'expo-status-bar';

// Sample data for the demo
const featuredBooks = [
  {
    id: '1',
    title: 'Vector Mechanics for Engineers Statics and Dynamics',
    authors: ['Beer, Ferdinand P', 'Johnston, E. Russell'],
    callNumber: '531 BEE',
    status: 'Available',
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    title: 'Engineering Mechanics',
    authors: ['Hibbeler, R. C', 'Yap, Kia Beng'],
    callNumber: '519.2 WAL',
    status: 'Available',
  },
  {
    id: '3',
    title: 'Probability and Statistics for Engineers and Scientists',
    authors: ['Walpole, Ronald E', 'Myers, Raymond H'],
    callNumber: '519.2 WAL',
    status: 'Checked out',
    dueDate: '20/06/2025',
    coverImage: 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '4',
    title: 'Fibres to Smart Textiles',
    authors: ['Patnaik, Asis', 'Patnaik, Sweta'],
    callNumber: '677 PAT',
    status: 'Available',
    coverImage: 'https://images.unsplash.com/photo-1603152008134-9e36e80e656c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      navigation.navigate('Search', { query });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Library App</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={30} color="#6366f1" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for books, authors..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <FlatList
        data={[
          { key: 'recently', title: 'Recently Added', data: featuredBooks.slice(0, 2) },
          { key: 'popular', title: 'Popular Now', data: featuredBooks.slice(2, 4) }
        ]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(book) => book.id}
              renderItem={({ item: book }) => (
                <BookItem
                  book={book}
                  onPress={() => navigation.navigate('BookDetail', { id: book.id })}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            {item.key === 'popular' && (
              <TouchableOpacity 
                style={styles.viewMoreButton}
                onPress={() => navigation.navigate('Search')}
              >
                <Text style={styles.viewMoreButtonText}>View More Books</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1f2937',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  separator: {
    height: 12,
  },
  viewMoreButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  viewMoreButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;
