import 'react-native-gesture-handler';

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { useTheme } from 'react-native-paper';

import AppStatusBar from './src/components/AppStatusBar';

import Routes from './src/routes'

export default function App() {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar style="light" backgroundColor={colors.primary} />
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})