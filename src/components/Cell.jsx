import React from "react";

import { 
  StyleSheet, 
  Text, 
  View 
} from "react-native";

export default ({ style, textStyle, text }) => {
  return (
    <View style={style ? [styles.cell, style] : styles.cell}>
      {text !== undefined && (
        <Text style={textStyle ? textStyle : styles.text}>{text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 1,
    marginBottom: 1,
    height: 25,
    width: 25,
  },
  text: {
    
  },
});
