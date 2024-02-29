import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  Modal,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
} from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function App() {
  const colorScheme = useColorScheme();

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer />
  </GestureHandlerRootView>
  );
}

