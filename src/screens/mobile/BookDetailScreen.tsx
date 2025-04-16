
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MobileHeader from '../../components/mobile/MobileHeader';

interface RouteParams {
  id: string;
}

const BookDetailScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  
  // Mock data - in a real app, you would fetch this data based on the ID
  const book = {
    id,
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    callNumber: 'F FITZ',
    status: 'Available',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    year: '1925',
    publisher: 'Charles Scribner\'s Sons',
    pages: 218,
    genres: ['Fiction', 'Classic', 'Literary Fiction'],
    language: 'English',
    isbn: '9780743273565',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MobileHeader title="Book Details" showBackButton={true} />
      
      <ScrollView style={styles.content}>
        <View style={styles.bookHeader}>
          <View style={styles.coverContainer}>
            <View style={styles.placeholderCover}>
              <Icon name="book-open" size={36} color="#a0aec0" />
            </View>
          </View>
          
          <View style={styles.bookInfo}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.authors}>{book.authors.join(', ')}</Text>
            
            <View style={styles.statusContainer}>
              <View style={[
                styles.badge,
                book.status === 'Available' ? styles.availableBadge : styles.checkedOutBadge
              ]}>
                <Text style={[
                  styles.badgeText,
                  book.status === 'Available' ? styles.availableText : styles.checkedOutText
                ]}>
                  {book.status}
                </Text>
              </View>
            </View>
            
            <Text style={styles.callNumber}>Call number: {book.callNumber}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Year</Text>
              <Text style={styles.detailValue}>{book.year}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Publisher</Text>
              <Text style={styles.detailValue}>{book.publisher}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pages</Text>
              <Text style={styles.detailValue}>{book.pages}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Language</Text>
              <Text style={styles.detailValue}>{book.language}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>ISBN</Text>
              <Text style={styles.detailValue}>{book.isbn}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genresContainer}>
            {book.genres.map((genre, index) => (
              <View key={index} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          {book.status === 'Available' ? (
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Reserve Now</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Join Waitlist</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
  },
  bookHeader: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  coverContainer: {
    width: 120,
    height: 180,
    marginRight: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  placeholderCover: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  authors: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 12,
  },
  statusContainer: {
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  availableBadge: {
    borderColor: '#48bb78',
    backgroundColor: 'transparent',
  },
  checkedOutBadge: {
    backgroundColor: '#f3f4f6',
    borderColor: '#f3f4f6',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  availableText: {
    color: '#48bb78',
  },
  checkedOutText: {
    color: '#ed8936',
  },
  callNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#1f2937',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreBadge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 14,
    color: '#4b5563',
  },
  actionButtons: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BookDetailScreen;
