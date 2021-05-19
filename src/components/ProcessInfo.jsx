import React, { useState } from 'react'

import {
	View,
  StyleSheet,
  Text
} from 'react-native'

import {
  TextInput
} from 'react-native-paper'

export default ({id, setTasks}) => {
  const [arrivalTime, setArrivalTime] = useState()
  const [executionTime, setExecutionTime] = useState()
  const [deadline, setDeadline] = useState()
  const [priority, setPriority] = useState()

  const addTask = (arrivalTime, executionTime, deadline, priority) => {
    setTasks(tasks => {
      
      tasks[id - 1] = {
      ...tasks[id - 1],
      arrivalTime: Number(arrivalTime),
      executionTime: Number(executionTime),
      deadline: Number(deadline),
      priority: Number(priority),
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
          label="Tempo de execução"
          keyboardType='number-pad'
          value={executionTime}
          onChangeText={value => {
            setExecutionTime(value)
            addTask(arrivalTime, value, deadline, priority)
          }}
        />
      </View>
      <View style={styles.rowEnd}>
        <TextInput
          mode='outlined'
          style={styles.rowItem}
          keyboardType='number-pad'
          label="Deadline"
          value={deadline}
          onChangeText={value => {
            setDeadline(value)
            addTask(arrivalTime, deadline, value, priority)
          }}
        />
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
      </View>  
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