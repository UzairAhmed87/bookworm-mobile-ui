
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BookItem = ({ book, onPress }) => {
  const { 
    title, 
    authors, 
    callNumber, 
    status, 
    dueDate, 
    coverImage 
  } = book;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.coverContainer}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.cover} />
        ) : (
          <View style={styles.placeholderCover}>
            <Ionicons name="book-outline" size={24} color="#a0aec0" />
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.authors} numberOfLines={1}>{authors.join(', ')}</Text>
        
        {callNumber && (
          <Text style={styles.callNumber}>Call number: {callNumber}</Text>
        )}
        
        <View style={styles.statusContainer}>
          <View style={[
            styles.badge,
            status === 'Available' ? styles.availableBadge : styles.checkedOutBadge
          ]}>
            <Text style={[
              styles.badgeText,
              status === 'Available' ? styles.availableText : styles.checkedOutText
            ]}>
              {status}
            </Text>
          </View>
          
          {dueDate && status === 'Checked out' && (
            <Text style={styles.dueDate}>Due: {dueDate}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  coverContainer: {
    width: 80,
    height: 110,
    borderRadius: 6,
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
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  authors: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  callNumber: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
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
    fontSize: 11,
    fontWeight: '500',
  },
  availableText: {
    color: '#10b981',
  },
  checkedOutText: {
    color: '#f59e0b',
  },
  dueDate: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
});

export default BookItem;
