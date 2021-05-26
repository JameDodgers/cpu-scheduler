import React from "react";

import { 
  StyleSheet, 
  Text, 
  View
} from "react-native";

import dimensions from "../util/dimensions";

import Cell from './Cell'

export default ({}) => {
  return (
    <View style={styles.subtitles}>
      <View style={styles.row}>
        <Cell style={styles.executing} />
        <Text style={styles.text}>Executando</Text>
      </View>
      <View style={styles.row}>
        <Cell style={styles.overload} />
        <Text style={styles.text}>Sobrecarga</Text>
      </View>        
      <View style={styles.row}>
        <Cell style={styles.deadlineOverflow} />
        <Text style={styles.text}>Estouro de Deadline</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.deadline} />
        <Text style={styles.text}>Deadline</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  subtitles: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    marginStart: 8,
    fontSize: 16,
  },
  executing:{
    backgroundColor: "chartreuse",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  overload:{
    backgroundColor: "red",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  deadlineOverflow:{
    backgroundColor: "darkgreen",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  deadline: {
    height: dimensions.cellSize,
    width: 2,
    backgroundColor: 'red',
  },
});
