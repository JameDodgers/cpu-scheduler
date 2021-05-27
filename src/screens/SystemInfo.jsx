import React, { useState, useRef } from "react";

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

import { schedulingAlgorithms, pagingAlgorithms } from "../libs/storage";

const index = ({ navigation }) => {
  const { colors } = useTheme();

  const [quantum, setQuantum] = useState("");
  const [overload, setOverload] = useState("");
  const [selectedSchedulingAlgorithm, setSelectedSchedulingAlgorithm] =
    useState(1);
  const [selectedPagingAlgorithm, setSelectedPagingAlgorithm] = useState(1);
  const [processesNumber, setProcessesNumber] = useState("");
  const quantumTextInputRef = useRef(null);
  const overloadTextInputRef = useRef(null);
  const [error, setError] = useState("");

  const isPreemptive =
    schedulingAlgorithms[selectedSchedulingAlgorithm - 1].preemptive;

  const handleSubmit = () => {
    if (!processesNumber.trim()) {
      setError("Informe o número de processos");

      return;
    }

    navigation.navigate("ProcessesInfo", {
      processesNumber: Number(processesNumber),
      quantum: !!quantum.trim() ? Number(quantum) : 1,
      overload: !!overload.trim() ? Number(overload) : 1,
      selectedPagingAlgorithm: selectedPagingAlgorithm,
      selectedSchedulingAlgorithm: selectedSchedulingAlgorithm,
    });
  };

  return (
    <View style={styles.container}>
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
              if (itemValue && !schedulingAlgorithms[itemValue - 1].preemptive) {
                quantumTextInputRef.current.blur();
                setQuantum("");
                overloadTextInputRef.current.blur();
                setOverload("");
              }

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
        {/* <Text
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
        </View> */}
        <View style={styles.row}>
          <TextInput
            ref={quantumTextInputRef}
            style={styles.textInputRow}
            mode="outlined"
            label="Quantum do Sistema"
            editable={isPreemptive}
            keyboardType="number-pad"
            value={quantum}
            onChangeText={setQuantum}
          />
          <TextInput
            ref={overloadTextInputRef}
            mode="outlined"
            style={styles.textInput}
            label="Sobrecarga do Sistema"
            keyboardType="number-pad"
            editable={isPreemptive}
            value={overload}
            onChangeText={setOverload}
          />
        </View>
        <TextInput
          mode="outlined"
          label="Número de processos"
          keyboardType="number-pad"
          value={processesNumber}
          onChangeText={setProcessesNumber}
        />
        <Text style={styles.error}>
          {error}
        </Text>
        <Button mode="contained" onPress={handleSubmit}>
          Próximo
        </Button>
      </ScrollView>
    </View>
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
  error: {
    color: "red",
    marginBottom: 16,
  }
});

export default index;
