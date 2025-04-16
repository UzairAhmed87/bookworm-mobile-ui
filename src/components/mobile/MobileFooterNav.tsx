
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const MobileFooterNav: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName: string) => {
    return route.name === routeName;
  };

  const navigateToHome = () => {
    // @ts-ignore - we'll handle the navigation type properly
    navigation.navigate('Home');
  };

  const navigateToSearch = () => {
    // @ts-ignore - we'll handle the navigation type properly
    navigation.navigate('Search');
  };

  const navigateToBorrowed = () => {
    // @ts-ignore - we'll handle the navigation type properly
    navigation.navigate('Borrowed');
  };

  const navigateToProfile = () => {
    // @ts-ignore - we'll handle the navigation type properly
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={navigateToHome}
      >
        <Icon 
          name="home" 
          size={20} 
          color={isActive('Home') ? '#6366f1' : '#6b7280'} 
        />
        <Text style={[
          styles.tabText, 
          isActive('Home') && styles.activeText
        ]}>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab} 
        onPress={navigateToSearch}
      >
        <Icon 
          name="search" 
          size={20} 
          color={isActive('Search') ? '#6366f1' : '#6b7280'} 
        />
        <Text style={[
          styles.tabText, 
          isActive('Search') && styles.activeText
        ]}>
          Search
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab} 
        onPress={navigateToBorrowed}
      >
        <Icon 
          name="book-open" 
          size={20} 
          color={isActive('Borrowed') ? '#6366f1' : '#6b7280'} 
        />
        <Text style={[
          styles.tabText, 
          isActive('Borrowed') && styles.activeText
        ]}>
          My Books
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab} 
        onPress={navigateToProfile}
      >
        <Icon 
          name="user" 
          size={20} 
          color={isActive('Profile') ? '#6366f1' : '#6b7280'} 
        />
        <Text style={[
          styles.tabText, 
          isActive('Profile') && styles.activeText
        ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingBottom: 4,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  activeText: {
    color: '#6366f1',
  },
});

export default MobileFooterNav;
