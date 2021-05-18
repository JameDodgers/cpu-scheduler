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

  const addTask = () => {
    setTasks(tasks => [...tasks, {
      id: id,
      arrivalTime: arrivalTime,
      executionTime: executionTime,
      deadline: deadline,
      priority: priority,
    }])
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
          onChangeText={number => {
            setArrivalTime(number)
            addTask()
            // setTasks(tasks => []) AQUI
          }}
        />
        <TextInput
          mode='outlined'
          style={styles.rowItemEnd}
          label="Tempo de execução"
          keyboardType='number-pad'
          value={executionTime}
          onChangeText={number => {
            setExecutionTime(number)
            addTask()
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
          onChangeText={number => {
            setDeadline(number)
            addTask()
          }}
        />
        <TextInput
          mode='outlined'
          style={styles.rowItemEnd}
          label="Prioridade"
          keyboardType='number-pad'
          value={priority}
          onChangeText={number => {
            setPriority(number)
            addTask()
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