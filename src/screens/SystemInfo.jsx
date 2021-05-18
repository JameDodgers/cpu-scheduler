import React, { useState } from "react";

import {
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
} from "react-native";

import { useTheme } from "react-native-paper";

import { TextInput, Button } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";

const index = ({ navigation }) => {
  const { colors } = useTheme();

  const [quantum, setQuantum] = useState();
  const [overload, setOverload] = useState();
  const [selectedSchedulingAlgorithm, setSelectedSchedulingAlgorithm] = useState();
  const [selectedPagingAlgorithm, setSelectedPagingAlgorithm] = useState();
  const [processesNumber, setProcessesNumber] = React.useState();

  const schedulingAlgorithms = [
    {
      id: 1,
      name: "FIFO",
    },
    {
      id: 2,
      name: "SJF",
    },
    {
      id: 3,
      name: "Round Robin",
    },
    {
      id: 4,
      name: "EDF",
    },
  ];

  const pagingAlgorithms = [
    {
      id: 1,
      name: "FIFO",
    },
    {
      id: 2,
      name: "Menos Recentemente Utilizado",
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text
          style={{
            color: colors.backdrop,
            marginBottom: 8,
            fontSize: 16,
          }}
        >
          Algoritmo de Escalonamento
        </Text>
        <View
          style={{
            ...styles.picker,
            borderColor: colors.backdrop,
            backgroundColor: colors.background,
          }}
        >
          <Picker
            selectedValue={selectedSchedulingAlgorithm}
            style={{
              color: colors.backdrop,
              height: 56,
            }}
            dropdownIconColor={colors.primary}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setSelectedSchedulingAlgorithm(itemValue);
            }}
          >
            <Picker.Item label="Selecione o algoritmo" value={null} />
            {schedulingAlgorithms.map((item) => {
              return (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              );
            })}
          </Picker>
        </View>
        <Text
          style={{
            color: colors.backdrop,
            marginBottom: 8,
            fontSize: 16,
          }}
        >
          Algoritmo de Paginação
        </Text>
        <View
          style={{
            ...styles.picker,
            borderColor: colors.backdrop,
            backgroundColor: colors.background,
          }}
        >
          <Picker
            selectedValue={selectedPagingAlgorithm}
            style={{
              color: colors.backdrop,
              height: 56,
            }}
            dropdownIconColor={colors.primary}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setSelectedPagingAlgorithm(itemValue);
            }}
          >
            <Picker.Item label="Selecione o algoritmo" value={null} />
            {pagingAlgorithms.map((item) => {
              return (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInputRow}
            mode="outlined"
            label="Tempo de Chegada"
            keyboardType="number-pad"
            value={quantum}
            onChangeText={(number) => setQuantum(number)}
          />
          <TextInput
            mode="outlined"
            style={styles.textInput}
            label="Tempo de execução"
            keyboardType="number-pad"
            value={overload}
            onChangeText={(number) => setOverload(number)}
          />
        </View>
        <TextInput
          style={styles.item}
          mode="outlined"
          label="Número de processos"
          keyboardType="number-pad"
          value={processesNumber}
          onChangeText={(number) => setProcessesNumber(number)}
        />
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("ProcessesInfo", {
              processesNumber: processesNumber | "0",
            })
          }
        >
          Próximo
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  item: {
    marginBottom: 16,
  },
  picker: {
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  textInputRow: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
});

export default index;
