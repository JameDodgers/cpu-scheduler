export const fifo = (queue) => {
  if (queue.length > 0) {
    const task = queue[0];

    --task.executionTime;

    if (task.executionTime === 0) {
      queue.splice(0, 1);
    }
    return {
      ...task,
      overload: false
    };
  }

  return undefined
};

// SJF (Shortest Job First) - retorna para o processador a tarefa mais curta na fila de tarefas prontas
export const sjf = (queue) => {

  if (queue.length > 0) {
    var shortestTask = queue[0];

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].executionTime < shortestTask.executionTime) {
        shortestTask = queue[i];
      }
    }

    --shortestTask.executionTime;

    if (shortestTask.executionTime === 0) {
      queue.splice(queue.indexOf(shortestTask), 1);
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
export const roundRobin = (queue, quantum) => {
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
export const edf = (queue, quantumCount, time) => {
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
