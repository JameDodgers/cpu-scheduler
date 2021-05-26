import React from "react";

import { 
  StyleSheet, 
  Text, 
  View
} from "react-native";
import dimensions from "../util/dimensions";

export default ({ style, textStyle, text }) => {
  return (
    <View>
      <View style={[styles.row]}>
        <View style={[styles.quadrado, styles.executando]}></View>
        <Text style={[styles.text]}>Executando</Text>
      </View>
      <View style={[styles.quadrado, styles.sobrecarga]}></View>
      <Text style={[styles.text]}>Sobrecarga</Text>

      <View style={[styles.quadrado, styles.estouroDeadline]}></View>
      <Text style={[styles.text]}>Estouro de deadline</Text>

      <View style={[styles.quadrado, styles.deadline]}></View>
      <Text style={[styles.text]}>Deadline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quadrado: {
    height: '100px',
    width: '100px',
  },
  text: {
    font-size: '20px',
  },
  executando:{
    backgroundColor: "green",
  },
  sobrecarga:{
    backgroundColor: "red",
  },
  estouroDeadline:{
    backgroundColor: "grey",
  },
  deadline:{
    borderRightWidth: "2px",
    borderColor: 'red',
  },
  row:{
    display: flex,
    flex-direction: row,
    
  }
});
