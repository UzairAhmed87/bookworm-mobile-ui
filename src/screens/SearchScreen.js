
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookItem from '../components/BookItem';
import { StatusBar } from 'expo-status-bar';

// Sample data for demo
const allBooks = [
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

const availabilityOptions = [
  { id: 'available', label: 'Available' },
  { id: 'checkedOut', label: 'Checked Out' }
];

const materialOptions = [
  { id: 'book', label: 'Books' },
  { id: 'journal', label: 'Journals' },
  { id: 'ebook', label: 'E-Books' },
  { id: 'reference', label: 'Reference' }
];

const SearchScreen = ({ route, navigation }) => {
  const initialQuery = route.params?.query || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(allBooks);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);

  const handleSearch = () => {
    // In a real app, this would filter results based on query
    console.log('Searching for:', query);
  };

  const toggleAvailabilityOption = (optionId) => {
    setSelectedAvailability(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const toggleMaterialOption = (optionId) => {
    setSelectedMaterial(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const applyFilters = () => {
    // In a real app, this would filter results based on selected options
    setShowFilters(false);
    console.log('Applied filters:', { selectedAvailability, selectedMaterial });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
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
        
        <View style={styles.filterBar}>
          <Text style={styles.resultsCount}>
            {results.length} results {query ? `for "${query}"` : ''}
          </Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            <Ionicons name="options-outline" size={16} color="#6366f1" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            onPress={() => navigation.navigate('BookDetail', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.resultsList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <View style={styles.modalHeaderButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalApplyButton}
                onPress={applyFilters}
              >
                <Text style={styles.modalApplyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Availability</Text>
            {availabilityOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={styles.filterOption}
                onPress={() => toggleAvailabilityOption(option.id)}
              >
                <View style={[
                  styles.checkbox,
                  selectedAvailability.includes(option.id) && styles.checkboxSelected
                ]}>
                  {selectedAvailability.includes(option.id) && (
                    <Ionicons name="checkmark" size={16} color="#ffffff" />
                  )}
                </View>
                <Text style={styles.filterOptionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Material Type</Text>
            {materialOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={styles.filterOption}
                onPress={() => toggleMaterialOption(option.id)}
              >
                <View style={[
                  styles.checkbox,
                  selectedMaterial.includes(option.id) && styles.checkboxSelected
                ]}>
                  {selectedMaterial.includes(option.id) && (
                    <Ionicons name="checkmark" size={16} color="#ffffff" />
                  )}
                </View>
                <Text style={styles.filterOptionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
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
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6366f1',
  },
  resultsList: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCancelButton: {
    marginRight: 16,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#6b7280',
  },
  modalApplyButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalApplyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  filterSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterOptionLabel: {
    fontSize: 16,
    color: '#1f2937',
  },
});

export default SearchScreen;
