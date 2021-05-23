export const fifo = (tasks, queue, time) => {
  if (queue.length > 0) {
    const task = queue[0];

    if(!tasks[task.id - 1].startExecutionTime) {
      tasks[task.id - 1].startExecutionTime = time + 1
    }

    --task.executionTime;

    if (task.executionTime === 0) {
      queue.splice(0, 1);
      tasks[task.id - 1].endExecutionTime = time + 1
    }
    return {
      ...task,
      overload: false
    };
  }

  return undefined
};

// SJF (Shortest Job First) - retorna para o processador a tarefa mais curta na fila de tarefas prontas
export const sjf = (tasks, queue, time) => {

  if (queue.length > 0) {
    var shortestTask = queue[0];

    console.log(tasks[shortestTask.id - 1])

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].executionTime < shortestTask.executionTime) {
        shortestTask = queue[i];
      }
    }

    if(!tasks[shortestTask.id - 1].startExecutionTime) {
      tasks[shortestTask.id - 1].startExecutionTime = time + 1
    }

    --shortestTask.executionTime;

    if (shortestTask.executionTime === 0) {
      queue.splice(queue.indexOf(shortestTask), 1);
      tasks[shortestTask.id - 1].endExecutionTime = time + 1
    }
    //console.log(shortestTask);
    return {
      ...shortestTask,
      overload: false
    };
  }

  return undefined;
};

// Round Robin - fifo com tempo de quantum
export const roundRobin = (queue, quantumCount, time) => {
  // Quebrado. Terminar 
  if (queue.length > 0) {
    const task = queue[0];

    task.executionTime -= 2;

    if (task.executionTime === 0) {
      queue.splice(0, 1);
    }
    return {
      ...task,
      overload: false
    };;
  }

  return undefined
};

// EDF (Earliest Deadline First) - retorna para o processador a tarefa com menor dealine na fila de prontos
export const edf = (queue, time, quantumCount) => {
  if (queue.length > 0) {
    var shortestTask = queue[0];

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].deadline < shortestTask.deadline) {
        shortestTask = queue[i];
      }
    }

    --shortestTask.deadline;

    if (shortestTask.deadline === 0) {
      //console.log(shortestTask.id + ": TM = " + shortestTask.turnaround);
      queue.splice(queue.indexOf(shortestTask), 1);
    }
    //console.log(shortestTask);
    return {
      ...shortestTask,
      overload: false
    };;
  }

  return undefined;
};
