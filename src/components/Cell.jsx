import React from "react";

import { 
  StyleSheet, 
  Text, 
  View
} from "react-native";
import dimensions from "../util/dimensions";

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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: dimensions.cellBorderSize,
    marginBottom: dimensions.cellBorderSize,
    height: dimensions.cellSize,
    width: dimensions.cellSize,
  },
  text: {
    
  },
});
