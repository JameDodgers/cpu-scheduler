import React from 'react'

import {
  StatusBar,
  StyleSheet, View
} from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const AppStatusBar = ({backgroundColor, ...props}) => {
  return(
    <View style={[styles.statusBar, backgroundColor]}>  
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