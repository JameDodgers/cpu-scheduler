import React, { useEffect, useState } from 'react'

import * as ScreenOrientation from 'expo-screen-orientation';

import { 
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'

// import RAM from '../components/RAM'
import Gantt from '../components/Gantt'
import { fifo, roundRobin, sjf } from '../functions/algorithms';

const tasks = [
  {
    id: 1,
    arrivalTime: 0,
    executionTime: 3,
    deadline: 2,
    priority: 1,
  },
  {
    id: 2,
    arrivalTime: 0,
    executionTime: 3,
    deadline: 2,
    priority: 1,
  },
  {
    id: 3,
    arrivalTime: 0,
    executionTime: 3,
    deadline: 2,
    priority: 1,
  },
  {
    id: 4,
    arrivalTime: 0,
    executionTime: 2,
    deadline: 2,
    priority: 1,
  }
]

const index = ({route}) => {
  // const { tasks } = route.params
  const [time, setTime] = useState(0)
  const [executedTask, setExecutedTask] = useState()

  const execute = () => {
    setTime(time => time + 1)
    scheduling()
    setExecutedTask(roundRobin(tasks, 2));
  }

  const scheduling = () => {
    const activeTasks = tasks.filter(((task) => task.arrivalTime <= time))
  }

  useEffect(() => {
    const executionInterval = setInterval(execute, 5000)

    return () => {
      clearInterval(executionInterval)
    }
  }, [])

  const changeScreenOrientation = async () => {
    try{
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    // changeScreenOrientation()
  }, [])

  const cellSize = 25

  const columnsNumber = Math.floor(Dimensions.get('window').width / cellSize)

  return(
    <View style={styles.container}>
      <Gantt
        tasks={tasks}
        time={time}
        executedTask={executedTask}
        columnsNumber={columnsNumber}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default index