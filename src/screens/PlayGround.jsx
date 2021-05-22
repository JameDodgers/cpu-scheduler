import React, { useEffect, useState } from "react";

import * as ScreenOrientation from "expo-screen-orientation";

import { useDimensions } from "@react-native-community/hooks";

import { 
  StyleSheet, 
  View, 
  ScrollView 
} from "react-native";

// import RAM from '../components/RAM'
import Gantt from "../components/Gantt";
import { fifo, roundRobin, sjf } from "../functions/algorithms";

import dimensions from "../util/dimensions";

// const tasks = [
//   {
//     id: 1,
//     arrivalTime: 0,
//     executionTime: 3,
//     deadline: 3,
//     priority: 1,
//   },
//   {
//     id: 2,
//     arrivalTime: 0,
//     executionTime: 3,
//     deadline: 6,
//     priority: 1,
//   },
//   {
//     id: 3,
//     arrivalTime: 0,
//     executionTime: 3,
//     deadline: 9,
//     priority: 1,
//   },
//   {
//     id: 4,
//     arrivalTime: 0,
//     executionTime: 2,
//     deadline: 11,
//     priority: 1,
//   },
// ];

const index = ({ route }) => {
  const {
    quantum,
    overload,
    tasks,
    selectedPagingAlgorithm,
    selectedSchedulingAlgorithm,
  } = route.params;

  const { height: width } = useDimensions().window;

  const [time, setTime] = useState(0);
  const [executedTask, setExecutedTask] = useState({
    id: 1,
    arrivalTime: 0,
    executionTime: 3,
    deadline: 2,
    priority: 1,
  });
  const [columnsNumber, setColumnsNumber] = useState();
  const [executionInterval, setExecutionInterval] = useState(null);
  const [queue, _] = useState(Array());

  const schedulingAlgorithms = [fifo, sjf, roundRobin];

  const schedulingAlgorithm =
    schedulingAlgorithms[selectedSchedulingAlgorithm - 1];

  let longestArrivalTime = 0

  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].arrivalTime > longestArrivalTime)
    longestArrivalTime = tasks[i].arrivalTime
  }

  useEffect(() => {
    const scheduling = () => {
      if(executedTask === undefined && time > longestArrivalTime) {
        clearInterval(executionInterval)
        return;
      }
  
      tasks.forEach((task, _) => {
        if (
          !(queue.some((item) => item.id === task.id)) &&
          task.arrivalTime === time
        ) {
          queue.push(Object.assign({}, task))
        }
      });
  
      setExecutedTask(schedulingAlgorithm(queue));
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

  const changeScreenOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );

      const columnsNumber =
        Math.floor(width / (dimensions.cellSize + dimensions.cellBorderSize)) - 5;

      setColumnsNumber(columnsNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default index;
