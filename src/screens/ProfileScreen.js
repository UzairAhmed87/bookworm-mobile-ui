
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { sendTestNotification } from '../utils/notifications';

const ProfileScreen = ({ navigation }) => {
  const { userInfo, logout } = useAuth();
  
  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const handleTestNotification = async () => {
    try {
      await sendTestNotification();
      Alert.alert('Notification Sent', 'Check your notifications!');
    } catch (error) {
      console.log('Notification error:', error);
      Alert.alert('Error', 'Failed to send notification');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userInfo?.name?.charAt(0) || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userInfo?.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{userInfo?.email || 'user@example.com'}</Text>
            <Text style={styles.memberSince}>Member since 2023</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userInfo?.borrowedBooks || 0}</Text>
            <Text style={styles.statLabel}>Borrowed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userInfo?.overdueBooks || 0}</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userInfo?.fineDue || '₹0.00'}</Text>
            <Text style={styles.statLabel}>Fine Due</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Library</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('MyBooks')}
          >
            <Ionicons name="book-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>My Borrowed Books</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="time-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Borrowing History</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="bookmark-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>My Reservations</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>App Settings</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Notification Settings</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleTestNotification}
          >
            <Ionicons name="paper-plane-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Test Notification</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Help</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={20} color="#1f2937" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>About</Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" style={styles.signOutIcon} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>App Version 1.0.0</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  memberSince: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginVertical: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuSection: {
    marginBottom: 16,
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingVertical: 12,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default ProfileScreen;
