import React from 'react'

import {
  StatusBar,
  StyleSheet, 
  View,
  Platform
} from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const AppStatusBar = ({backgroundColor, ...props}) => {
  const containerStyle = {
    ...styles.statusBar,
    backgroundColor
  }

  return(
    <View style={containerStyle}>  
      <StatusBar 
        translucent 
        backgroundColor={backgroundColor} 
        {...props}
      />
    </View>
  )
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
})

export default AppStatusBar