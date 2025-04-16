
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  onSearchPress?: () => void;
  onProfilePress?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBackButton = false,
  onSearchPress,
  onProfilePress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={24} color="#1f2937" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu" size={24} color="#1f2937" />
          </TouchableOpacity>
        )}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onSearchPress || (() => navigation.navigate('Search'))}
        >
          <Icon name="search" size={20} color="#1f2937" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onProfilePress || (() => navigation.navigate('Profile'))}
        >
          <Icon name="user" size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  backButton: {
    marginRight: 8,
  },
  menuButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default MobileHeader;
