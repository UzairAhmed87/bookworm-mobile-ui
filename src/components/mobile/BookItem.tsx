
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

interface BookItemProps {
  id: string;
  title: string;
  authors: string[];
  callNumber?: string;
  status?: 'Available' | 'Checked out';
  dueDate?: string;
  coverImage?: string;
}

const BookItem: React.FC<BookItemProps> = ({
  id,
  title,
  authors,
  callNumber,
  status = 'Available',
  dueDate,
  coverImage,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('BookDetail', { id })}
    >
      <View style={styles.row}>
        <View style={styles.coverContainer}>
          {coverImage ? (
            <Image source={{ uri: coverImage }} style={styles.cover} />
          ) : (
            <View style={styles.placeholderCover}>
              <Icon name="book-open" size={24} color="#a0aec0" />
            </View>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  coverContainer: {
    width: 64,
    height: 80,
    marginRight: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  cover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderCover: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a202c',
  },
  authors: {
    fontSize: 14,
    color: '#4a5568',
    marginTop: 4,
  },
  callNumber: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
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
    fontSize: 10,
    fontWeight: '500',
  },
  availableText: {
    color: '#48bb78',
  },
  checkedOutText: {
    color: '#ed8936',
  },
  dueDate: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 8,
  },
});

export default BookItem;
