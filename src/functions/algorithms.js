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

function multiplo(n, mult) {
  if((mult % n) === 0) return true;
  else return false;
}

// Round Robin - fifo com tempo de quantum
export const roundRobin = (tasks, queue, time, quantum, quantumCount, setQuantumCount) => {
  if (queue.length > 0) {
    const task = queue[0];

    if(!tasks[task.id - 1].startExecutionTime) {
      tasks[task.id - 1].startExecutionTime = time + 1
    }

    //console.log(quantumCount);
    setQuantumCount(quantumCount => quantumCount -1);
    --task.executionTime;
    if(quantumCount === 1  && task.executionTime > 0) {
      //console.log('entrou');
      queue.splice(0, 1);
      queue.push(task);
      setQuantumCount(quantum);
    }

    if (task.executionTime === 0) {
      queue.splice(0, 1);
      tasks[task.id - 1].endExecutionTime = time + 1;
      setQuantumCount(quantum);
    }
    return {
      ...task,
      overload: false
    };
  }

  return undefined
};

// EDF (Earliest Deadline First) - retorna para o processador a tarefa com menor dealine na fila de prontos
export const edf = (tasks, queue, time, quantum, quantumCount, setQuantumCount) => {
  if (queue.length > 0) {
    var task = queue[0];

    // Seleciona o processo com menor dealine
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].deadline < task.deadline) {
        task = queue[i];
      }
    }
    
    if(!tasks[task.id - 1].startExecutionTime) {
      tasks[task.id - 1].startExecutionTime = time + 1
    }

    --task.executionTime;

    //console.log(quantumCount);
    setQuantumCount(quantumCount => quantumCount -1);
    --task.executionTime;
    
    if(quantumCount === 1  && task.executionTime > 0) {
      //console.log('entrou');
      queue.splice(queue.indexOf(task), 1);
      queue.push(task);
      setQuantumCount(quantum);
    }

    // Tira da fila se acabou o tempo de excução
    if (task.executionTime === 0) {
      queue.splice(queue.indexOf(task), 1);
      tasks[task.id - 1].endExecutionTime = time + 1;
      setQuantumCount(quantum);
    }

    //console.log(task);
    return {
      ...task,
      overload: false
    };;
  }

  return undefined;
};
