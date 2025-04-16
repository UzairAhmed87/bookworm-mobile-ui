
import React from 'react';
import { registerRootComponent } from 'expo';
import AppMobile from './src/AppMobile';

export default function App() {
  return <AppMobile />;
}

// Register the app as the main component
registerRootComponent(App);
