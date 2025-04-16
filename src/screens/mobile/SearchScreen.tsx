
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import MobileHeader from '../../components/mobile/MobileHeader';
import MobileFooterNav from '../../components/mobile/MobileFooterNav';
import SearchBox from '../../components/mobile/SearchBox';
import BookItem from '../../components/mobile/BookItem';

// Mock data for demonstration
const searchResults = [
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
  },
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

const filterOptions = {
  availability: [
    { id: 'available', label: 'Available' },
    { id: 'checked-out', label: 'Checked Out' }
  ],
  format: [
    { id: 'book', label: 'Book' },
    { id: 'ebook', label: 'E-Book' },
    { id: 'audiobook', label: 'Audiobook' }
  ]
};

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // Here you would typically fetch results based on the query
  };

  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter(id => id !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MobileHeader title="Search" />
      
      <SearchBox onSearch={handleSearch} />
      
      <View style={styles.filterHeader}>
        <Text style={styles.resultsText}>
          {query ? `Results for "${query}"` : 'All Books'}
        </Text>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Icon name="filter" size={16} color="#4b5563" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Availability</Text>
            <View style={styles.filterOptions}>
              {filterOptions.availability.map(option => (
                <TouchableOpacity 
                  key={option.id}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(option.id) && styles.filterOptionSelected
                  ]}
                  onPress={() => toggleFilter(option.id)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilters.includes(option.id) && styles.filterOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Format</Text>
            <View style={styles.filterOptions}>
              {filterOptions.format.map(option => (
                <TouchableOpacity 
                  key={option.id}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(option.id) && styles.filterOptionSelected
                  ]}
                  onPress={() => toggleFilter(option.id)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilters.includes(option.id) && styles.filterOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
      
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BookItem {...item} />}
        contentContainerStyle={styles.resultsList}
      />
      
      <MobileFooterNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 4,
  },
  filtersContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#1f2937',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterOptionText: {
    fontSize: 12,
    color: '#4b5563',
  },
  filterOptionTextSelected: {
    color: 'white',
  },
  resultsList: {
    padding: 16,
  },
});

export default SearchScreen;
