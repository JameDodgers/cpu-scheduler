import React, { useEffect, useState } from "react";

import * as ScreenOrientation from "expo-screen-orientation";

import { useDimensions } from "@react-native-community/hooks";

import { 
  StyleSheet, 
  View, 
  Text,
  ScrollView 
} from "react-native";

// import RAM from '../components/RAM'
import Gantt from "../components/Gantt";
import Subtitles from "../components/Subtitles";

import { 
  fifo, 
  roundRobin, 
  sjf, 
  edf,
  prioridade
} from "../functions/algorithms";

import { 
  schedulingAlgorithms as schedulingAlgorithmsInfo, 
  pagingAlgorithms
} from '../libs/storage'

import dimensions from "../util/dimensions";

const index = ({ route }) => {
  const {
    quantum,
    overload,
    tasks,
    selectedPagingAlgorithm,
    selectedSchedulingAlgorithm,
  } = route.params;
  console.log(tasks)

  const { height: width } = useDimensions().window;

  const [time, setTime] = useState(0);
  const [executedTask, setExecutedTask] = useState();
  const [columnsNumber, setColumnsNumber] = useState();
  const [executionInterval, setExecutionInterval] = useState(null);
  const [queue, _] = useState(Array());
  const [overloadCount, setOverloadCount] = useState(0)
  const [quantumCount, setQuantumCount] = useState(Number(quantum))
  const [turnaround, setTurnaround] = useState()
  
  const schedulingAlgorithms = [fifo, sjf, roundRobin, edf, prioridade];

  const schedulingAlgorithm =
    schedulingAlgorithms[selectedSchedulingAlgorithm - 1];

  let longestArrivalTime = 0

  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].arrivalTime > longestArrivalTime)
    longestArrivalTime = tasks[i].arrivalTime
  }

  useEffect(() => {
    const scheduling = () => {
      // Interrompe a contagem de tempo se não há mais processos em execução e não vai chegar mais nenhum processo
      if(executedTask === undefined && time > longestArrivalTime) {
        clearInterval(executionInterval)

        // console.log(tasks)

        setTurnaround(tasks.reduce((acc, task) => acc +
        (task.endExecutionTime - task.arrivalTime), 0) / tasks.length)

        return;
      }
      // Introduz os processos na fila de execução (queue) conforme eles chegam
      tasks.forEach((task, _) => {
        if (
          !(queue.some((item) => item.id === task.id)) &&
          task.arrivalTime === time
        ) {
          if(schedulingAlgorithmsInfo[selectedSchedulingAlgorithm - 1].name === "Round Robin") {
            task.endExecutionTime = task.arrivalTime
            queue.splice(0, 0, Object.assign({}, task))
          }else {
            queue.push(Object.assign({}, task))
          }
        }
      });

      // Executa o algoritmo de escalonamento selecionado se não houver sobrecarga
      if(!overloadCount) {
        const newTask = schedulingAlgorithm(tasks, queue, time, quantum, quantumCount, setQuantumCount)

        /* if(
          executedTask && newTask && 
          (executedTask.id !== newTask)
        ) {
          setQuantumCount(Number(quantum))
        } */

        if(executedTask && newTask && (
          (schedulingAlgorithmsInfo[selectedSchedulingAlgorithm - 1].preemptive) &&
          (newTask.executionTime !== 0) && 
          (quantumCount === 1)
        )){
          setOverloadCount(Number(overload))
        }

        setExecutedTask(newTask);
        //setQuantumCount(quantumCount => quantumCount - 1)
      } else {
        setOverloadCount(overloadCount => overloadCount - 1)
        setExecutedTask(executedTask => ({
          ...executedTask, 
          overload: true
        }))
      }
    };

    scheduling();
  }, [time]);

  useEffect(() => {
    const execute = () => {
      setTime((time) => time + 1);
    };

    setExecutionInterval(setInterval(execute, 500));

    return () => {
      clearInterval(executionInterval);
    };
  }, []);

  useEffect(() => {
    const changeScreenOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
  
        const columnsNumber =
          Math.ceil(width / (dimensions.cellSize + dimensions.cellBorderSize)) - 5;
        
        setColumnsNumber(columnsNumber);
      } catch (error) {
        console.log(error);
      }
    };

    changeScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {columnsNumber !== undefined && (
          <Gantt
            tasks={tasks}
            time={time}
            executedTask={executedTask}
            columnsNumber={columnsNumber}
          />
        )}
      </ScrollView>
      <Subtitles />
      <View>
        {(turnaround !== undefined) && (
          <Text style={styles.text}>
            {`Tempo Médio: ${turnaround.toFixed(2)}`}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  text: {
    marginStart: 8,
  },
});

export default index;
