import React, { useEffect, useState } from 'react'

import {
  StyleSheet,
  View
} from 'react-native'
import Cell from './Cell'

export default ({tasks, executedTask, time, columnsNumber}) => {
  const [maxTime, setMaxTime] = useState(columnsNumber)

  const [matrix, setMatrix] = useState(
    Array.from({length: tasks.length}, () => 
      Array.from({length: columnsNumber}, () => 0)
    )
  )
  
  useEffect(() => {
    setMaxTime(Math.max(columnsNumber, time))

    const draw = () => {     
      if(executedTask !== undefined){
        if(time > columnsNumber) {
          const updatedMatrix = matrix.map((task, _) => task.push(0))
          setMatrix(updatedMatrix)
        }

        const updatedMatrix = matrix
        updatedMatrix[executedTask.id - 1][time] = 1

        setMatrix(updatedMatrix)
      }
    }

    draw()
  }, [time])

  return(
    <View style={styles.container}>
      <View>
        {
          tasks.map((task, row) => (
            <View 
              key={`infoS${row}`}
              style={styles.row}>
              <View style={styles.row}>
                <Cell text={task.arrivalTime} />
                <Cell text={task.executionTime} />
                <Cell text={task.deadline} />
                <Cell text={task.priority} />
                <Cell text={task.id} />
              </View>
            </View>
          ))
        }
        <View style={styles.row}>
          <Cell text='TC' />
          <Cell text='TE' />
          <Cell text='D' />
          <Cell text='P' />
          <Cell text='ID' />
        </View>
      </View> 
      <View>
        {
          matrix.map((task, row) => (
            <View 
              key={`${row}`}
              style={styles.row}>
                {
                  task.map((cell, column) => (
                    <Cell
                      style={(cell === 1) 
                        ? { backgroundColor: 'green'} 
                        : undefined
                      }
                      key={`${row}${column}`} 
                    />
                  ))
                }                
            </View>            
          ))
        }
        <View style={styles.row}>
          {
            [...Array(Number(maxTime))]
            .map((_, index) => (
              <Cell 
                key={`time${index + 1}`}  
                text={`${index + 1}`} 
              />
            ))
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'black'
  },
})