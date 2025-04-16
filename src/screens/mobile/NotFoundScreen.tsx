
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotFound from '../../components/mobile/NotFound';

const NotFoundScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NotFound />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});

export default NotFoundScreen;
