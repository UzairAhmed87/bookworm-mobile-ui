
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Share as RNShare,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sample book details for demo
const bookDetails = {
  id: '1',
  title: 'Vector Mechanics for Engineers Statics and Dynamics',
  authors: ['Beer, Ferdinand P', 'Johnston, E. Russell'],
  publisher: 'New Delhi : Tata McGraw-Hill Publishing',
  year: '2004',
  edition: '7th SI Units',
  description: 'A comprehensive introduction to statics and dynamics for engineering students.',
  isbn: '9780071311137',
  callNumber: '531 BEE',
  materialType: 'Text',
  language: 'English',
  subject: ['Engineering', 'Mechanics', 'Physics'],
  status: 'Available',
  location: 'Book Bank',
  coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
};

const BookDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  // In a real app, you would fetch book details based on the ID
  const book = bookDetails;
  
  const handleShare = async () => {
    try {
      await RNShare.share({
        message: `Check out this book: ${book.title} by ${book.authors.join(', ')}`,
      });
    } catch (error) {
      console.log('Share error:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Book Details</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.bookHeader}>
          <View style={styles.coverContainer}>
            {book.coverImage ? (
              <Image source={{ uri: book.coverImage }} style={styles.cover} />
            ) : (
              <View style={styles.placeholderCover}>
                <Ionicons name="book-outline" size={36} color="#a0aec0" />
              </View>
            )}
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
            
            <TouchableOpacity 
              style={styles.reserveButton}
              activeOpacity={0.7}
            >
              <Text style={styles.reserveButtonText}>Reserve</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailsTable}>
            <DetailRow label="Call Number" value={book.callNumber} />
            <DetailRow label="Publisher" value={book.publisher} />
            <DetailRow label="Edition" value={book.edition} />
            <DetailRow label="Year" value={book.year} />
            <DetailRow label="Language" value={book.language} />
            <DetailRow label="ISBN" value={book.isbn} />
            <DetailRow label="Location" value={book.location} />
          </View>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Subjects</Text>
          <View style={styles.subjectsContainer}>
            {book.subject.map((subject, index) => (
              <View key={index} style={styles.subjectTag}>
                <Text style={styles.subjectText}>{subject}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Similar Books</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.similarBooksContainer}
          >
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.similarBookItem}>
                <View style={styles.similarBookCover}></View>
                <Text style={styles.similarBookTitle} numberOfLines={2}>Similar Book Title</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

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
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  bookHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  coverContainer: {
    width: 120,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  cover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderCover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  authors: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  statusContainer: {
    marginBottom: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
  },
  availableBadge: {
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  checkedOutBadge: {
    borderColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  availableText: {
    color: '#10b981',
  },
  checkedOutText: {
    color: '#f59e0b',
  },
  reserveButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  detailsTable: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    width: '35%',
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  subjectTag: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  subjectText: {
    fontSize: 12,
    color: '#4b5563',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  similarBooksContainer: {
    paddingVertical: 8,
  },
  similarBookItem: {
    width: 100,
    marginRight: 16,
  },
  similarBookCover: {
    height: 150,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    marginBottom: 8,
  },
  similarBookTitle: {
    fontSize: 12,
    color: '#1f2937',
  },
});

export default BookDetailScreen;
