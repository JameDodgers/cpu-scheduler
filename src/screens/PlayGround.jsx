import React, { useEffect, useState } from 'react'

import * as ScreenOrientation from 'expo-screen-orientation';

import { useDimensions } from '@react-native-community/hooks'

import { 
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

// import RAM from '../components/RAM'
import Gantt from '../components/Gantt'
import { fifo, roundRobin, sjf } from '../functions/algorithms';

import dimensions from '../util/dimensions'

const tasks = [
  {
    id: 1,
    arrivalTime: 0,
    executionTime: 3,
    deadline: 0,
    priority: 1,
  },
  {
    id: 2,
    arrivalTime: 0,
    executionTime: 3,
    deadline: 1,
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
    deadline: 3,
    priority: 1,
  }
]

const index = ({route}) => {
  const {
    quantum,
    overload,
    // tasks,
    selectedPagingAlgorithm,
    selectedSchedulingAlgorithm,
  } = route.params
  
  const { 
    height: width
  } = useDimensions().window

  const [time, setTime] = useState(0)
  const [executedTask, setExecutedTask] = useState({
      id: 1,
      arrivalTime: 0,
      executionTime: 3,
      deadline: 2,
      priority: 1,
    })
  const [columnsNumber, setColumnsNumber] = useState()
  const [executionInterval, setExecutionInterval] = useState(null)

  const scheduling = () => {
    const activeTasks = tasks.filter(((task) => task.arrivalTime >= time))

    // console.log(`${time}`)

    // Para não fazer o gráfico crescer indefinidamente
    if(time === 40){
      setExecutedTask(undefined)
      clearInterval(executionInterval)
      console.log('stop')
    }

    // setExecutedTask(roundRobin(tasks, 2));
  }

  useEffect(() => {
    // console.log(time)
    scheduling()
  }, [time])

  const execute = () => {
    setTime(time => time + 1)
  }

  useEffect(() => {   
    setExecutionInterval(setInterval(execute, 500))
    
    return () => {
      clearInterval(executionInterval)
    }
  }, [])

  const changeScreenOrientation = async () => {
    try{
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

      const columnsNumber = Math.floor(width / (dimensions.cellSize + dimensions.cellBorderSize)) - 5
      setColumnsNumber(columnsNumber)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    changeScreenOrientation()

    return () => {
      ScreenOrientation.unlockAsync()
    }
  }, [])

  return(
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
        {
          (columnsNumber !== undefined) && (
            <Gantt
              tasks={tasks}
              time={time}
              executedTask={executedTask}
              columnsNumber={columnsNumber}
            />
          )
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default index