import * as React from 'react'

import {
  fifo,
  sjf,
  roundRobin,
  edf,
  priority
} from './algorithms'

let tasks, queue, time, quantum, quantumCount, setQuantumCount;

const resetTasks = () => [
    {
      id: 1,
      arrivalTime: 0,
      executionTime: 4,
      deadline: 7,
      priority: 0,
      startExecutionTime: undefined,
      endExecutionTime: undefined,
    },
    {
      id: 2,
      arrivalTime: 2,
      executionTime: 2,
      deadline: 5,
      priority: 1,
      startExecutionTime: undefined,
      endExecutionTime: undefined,
    },
    {
      id: 3,
      arrivalTime: 4,
      executionTime: 1,
      deadline: 8,
      priority: 2,
      startExecutionTime: undefined,
      endExecutionTime: undefined,
    },
    {
      id: 4,
      arrivalTime: 6,
      executionTime: 3,
      deadline: 10,
      priority: 3,
      startExecutionTime: undefined,
      endExecutionTime: undefined,
    }
  ]

beforeEach(() => {
  queue = [];
  time = 0;
  quantum = 2;
  tasks = resetTasks()

  const setState = jest.fn();

  const useStateSpy = jest.spyOn(React, 'useState');

  useStateSpy.mockImplementation(initial => [initial, setState]);

  [quantumCount, setQuantumCount] = useStateSpy(2);
})

describe.each`
  algorithm
  ${fifo}
  ${sjf}
  ${roundRobin}
  ${edf}
  ${priority}
`('$algorithm.name', ({algorithm}) => {
  test('if queue is empty, none task is executed', () => {
    expect(algorithm(tasks, queue, time)).toBeUndefined();
  })

  test('if the execution time of the executed task is about to end, remove it from queue', () => {    
    const task = tasks[2];
    
    queue.push(task)
    
    algorithm(tasks, queue, time, quantum, quantumCount, setQuantumCount)
    
    expect(queue).not.toContain(task)
  })
});

describe('sjf', () => {
  test('given two tasks, execute the one with shortest time', () => {
    const tasks = [], queue = [];

    const task = {
      id: 1,
      arrivalTime: 0,
      executionTime: 2,
      deadline: undefined,
      priority: 0,
      startExecutionTime: undefined,
      endExecutionTime: undefined,
    }

    const shortestTask = {
      id: 2,
      arrivalTime: 0,
      executionTime: 1,
      deadline: undefined,
      priority: 0,
      startExecutionTime: undefined,
      endExecutionTime: undefined,
    }

    tasks.push(task, shortestTask)
    queue.push(task, shortestTask)

    expect(sjf(tasks, queue, time)).toHaveProperty('id', 2)
  })
});

describe('roundRobin', () => {
  test.todo('given multiple tasks at queue, execute the oldest without being executed');
  test.todo('overload');
  // expect(quantumCount).toHaveBeenCalled()
});