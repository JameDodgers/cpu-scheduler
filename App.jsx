import 'react-native-gesture-handler';

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { useTheme } from 'react-native-paper';

import AppStatusBar from './src/components/AppStatusBar';

import Routes from './src/routes'

import * as Sentry from 'sentry-expo';

export const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  debug: __DEV__,
  environment: __DEV__ ? "development" : "production",
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
    }),
  ]
});

const App = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar style="light" backgroundColor={colors.primary} />
      <Routes 
        routingInstrumentation={routingInstrumentation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Sentry.Native.wrap(App);