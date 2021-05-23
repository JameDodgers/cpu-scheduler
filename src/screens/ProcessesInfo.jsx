import React, { useState } from "react";

import { 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView
} from "react-native";

import { Button } from "react-native-paper";

import ProcessInfo from "../components/ProcessInfo";

const index = ({ navigation, route }) => {
  const { 
    processesNumber,
    overload,
    quantum,
    selectedPagingAlgorithm,
    selectedSchedulingAlgorithm,
  } = route.params;

  const [tasks, setTasks] = useState(
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
  );

  const handleSubmit = () => {
    // console.log(tasks)
    navigation.navigate("PlayGround", {
      tasks: tasks,
      quantum: quantum,
      overload: overload,
      processesNumber: processesNumber,
      selectedPagingAlgorithm: selectedPagingAlgorithm,
      selectedSchedulingAlgorithm: selectedSchedulingAlgorithm,
    });
  }

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
        style={styles.content}
      >
        {[...Array(Number(processesNumber))]
        .map((_, index) => (
          <ProcessInfo 
            id={index + 1} 
            key={index} 
            setTasks={setTasks} 
          />
        ))}
        <Button
          mode="contained"
          onPress={() => handleSubmit()}
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 8,
  },
});

export default index;
