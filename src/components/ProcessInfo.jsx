import React, { useState } from 'react'

import {
	View,
  StyleSheet,
  Text
} from 'react-native'

import {
  TextInput
} from 'react-native-paper'

import { schedulingAlgorithms } from "../libs/storage";

export default ({id, setTasks, selectedSchedulingAlgorithm}) => {
  const [arrivalTime, setArrivalTime] = useState('')
  const [executionTime, setExecutionTime] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState('')

  const schedulingAlgorithm =
    schedulingAlgorithms[selectedSchedulingAlgorithm - 1];

  const addTask = (arrivalTime, executionTime, deadline, priority) => {
    setTasks(tasks => {    
      tasks[id - 1] = {
      ...tasks[id - 1],
      arrivalTime: !!arrivalTime.trim() ? Number(arrivalTime) : 0,
      executionTime: !!executionTime.trim() ? Number(executionTime) : 1,
      deadline: !!deadline.trim() ? Number(deadline) : undefined,
      priority: !!priority.trim() ? Number(priority) : 0,
    }
      return tasks
    })
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        {`Processo ${id}`}
      </Text>
      <View style={styles.row}>
        <TextInput
          style={styles.rowItem}
          mode='outlined'
          label="Tempo de Chegada"
          keyboardType='number-pad'
          value={arrivalTime}
          onChangeText={value => {
            setArrivalTime(value)
            addTask(value, executionTime, deadline, priority)
          }}
        />
        <TextInput
          mode='outlined'
          style={styles.rowItemEnd}
          label="Tempo de Execução"
          keyboardType='number-pad'
          value={executionTime}
          onChangeText={value => {
            setExecutionTime(value)
            addTask(arrivalTime, value, deadline, priority)
          }}
        />
      </View>
      {schedulingAlgorithm.name === "EDF" &&
        <TextInput
          mode='outlined'
          style={styles.rowItemEnd}
          keyboardType='number-pad'
          label="Deadline"
          value={deadline}
          onChangeText={value => {
            setDeadline(value)
            addTask(arrivalTime, deadline, value, priority)
          }}
        />
      }
      {schedulingAlgorithm.name === "Priority" &&  
        <TextInput
          mode='outlined'
          style={styles.rowItemEnd}
          label="Prioridade"
          keyboardType='number-pad'
          value={priority}
          onChangeText={value => {
            setPriority(value)
            addTask(arrivalTime, executionTime, deadline, value)
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  row: {
    flexDirection:'row',
    marginBottom: 8,
  },
  rowEnd: {
    flexDirection:'row',
  },
  rowItem: {
    flex: 1,
    marginRight: 8,
  },
  rowItemEnd: {
    flex: 1,
  }
})