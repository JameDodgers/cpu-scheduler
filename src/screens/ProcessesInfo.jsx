import React, { useState, useEffect } from "react";

import { 
  StyleSheet, 
  ScrollView, 
  View,
  Text,
} from "react-native";

import { TextInput, Button } from "react-native-paper";

import ProcessInfo from "../components/ProcessInfo";

const index = ({ navigation }) => {
  const [processesNumber, setProcessesNumber] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(() => (
      [...Array(Number(processesNumber))].map((_, index) => {
        return {
          id: index + 1,
          arrivalTime: 0,
          executionTime: 1,
          deadline: undefined,
          priority: 0,
          startExecutionTime: undefined,
          endExecutionTime: undefined,
        }
      })
    ))
  }, [processesNumber])

  const validateProcessNumber = (value) => {
    if (!value.trim()) {
      setError("Informe o número de processos");

      return false;
    }

    setError("");

    return true;
  }

  const handleSubmit = () => {
    if(validateProcessNumber(processesNumber)) {
      navigation.navigate("SystemInfo", {
        tasks: tasks,
      });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
      >
        <TextInput
          mode="outlined"
          label="Número de processos"
          keyboardType="number-pad"
          value={processesNumber}
          onChangeText={(value) => {
            setProcessesNumber(value)
            validateProcessNumber(value)
          }}
        />
        <Text style={styles.error}>
          {error}
        </Text>
        {[...Array(Number(processesNumber))]
        .map((_, index) => (
          <ProcessInfo 
            id={index + 1} 
            key={index}
            setTasks={setTasks} 
          />
        ))}
      </ScrollView>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => handleSubmit()}
      >
        Próximo
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 8,
  },
  button: {
    margin: 8,
  },
  error: {
    color: "red",
    marginStart: 8,
  }
});

export default index;
