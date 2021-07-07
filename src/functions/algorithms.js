export const fifo = (tasks, queue, time) => {
  if (queue.length > 0) {
    const task = queue[0];

    if (!tasks[task.id - 1].startExecutionTime) {
      tasks[task.id - 1].startExecutionTime = time + 1;
    }

    --task.executionTime;

    if (task.executionTime === 0) {
      queue.splice(0, 1);
      tasks[task.id - 1].endExecutionTime = time + 1;
    }

    return {
      ...task,
      overload: false,
    };
  }

  return undefined;
};

// SJF (Shortest Job First) - retorna para o processador a tarefa mais curta na fila de tarefas prontas
export const sjf = (tasks, queue, time) => {
  if (queue.length > 0) {
    var shortestTask = queue[0];

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].executionTime < shortestTask.executionTime) {
        shortestTask = queue[i];
      }
    }

    if (!tasks[shortestTask.id - 1].startExecutionTime) {
      tasks[shortestTask.id - 1].startExecutionTime = time + 1;
    }

    --shortestTask.executionTime;

    if (shortestTask.executionTime === 0) {
      queue.splice(queue.indexOf(shortestTask), 1);
      tasks[shortestTask.id - 1].endExecutionTime = time + 1;
    }
    
    return {
      ...shortestTask,
      overload: false,
    };
  }

  return undefined;
};

// Round Robin - fifo com tempo de quantum
export const roundRobin = (
  tasks,
  queue,
  time,
  quantum,
  quantumCount,
  setQuantumCount
) => {
  if (queue.length > 0) {
    let task = queue[0];

    for (let i = 0; i < queue.length; i++) {
      if (
        tasks[queue[i].id - 1].endExecutionTime <
        tasks[task.id - 1].endExecutionTime
      ) {
        task = queue[i];
      }
    }

    if (!tasks[task.id - 1].startExecutionTime) {
      tasks[task.id - 1].startExecutionTime = time + 1;
    }

    setQuantumCount((quantumCount) => quantumCount - 1);

    --task.executionTime;

    if (quantumCount === 1 && task.executionTime > 0) {
      queue.splice(queue.indexOf(task), 1);
      queue.push(task);
      tasks[task.id - 1].endExecutionTime = time + 1;
      setQuantumCount(quantum);
    }

    if (task.executionTime === 0) {
      queue.splice(queue.indexOf(task), 1);
      tasks[task.id - 1].endExecutionTime = time + 1;
      setQuantumCount(quantum);
    }

    return {
      ...task,
      overload: false,
    };
  }

  return undefined;
};

// EDF (Earliest Deadline First) - retorna para o processador a tarefa com menor dealine na fila de prontos
export const edf = (
  tasks,
  queue,
  time,
  quantum,
  quantumCount,
  setQuantumCount
) => {
  if (queue.length > 0) {
    let task = queue[0];

    if (quantumCount === quantum) {
      // Seleciona o processo com menor dealine
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].deadline < task.deadline) {
          task = queue[i];
        }
      }

      queue.splice(queue.indexOf(task), 1);
      queue.splice(0, 0, task);
    }

    if (!tasks[task.id - 1].startExecutionTime) {
      tasks[task.id - 1].startExecutionTime = time + 1;
    }

    setQuantumCount((quantumCount) => quantumCount - 1);
    --task.executionTime;

    if (quantumCount === 1 && task.executionTime > 0) {
      setQuantumCount(quantum);
    }

    // Tira da fila se acabou o tempo de excução
    if (task.executionTime === 0) {
      queue.splice(0, 1);
      tasks[task.id - 1].endExecutionTime = time + 1;
      setQuantumCount(quantum);
    }

    return {
      ...task,
      overload: false,
    };

  }

  return undefined;
};

// Escalonamento por Prioridade - retorna para o processador a tarefa com a maior prioridade na fila de prontos
export const priority = (
  tasks,
  queue,
  time,
  quantum,
  quantumCount,
  setQuantumCount
) => {
  if (queue.length > 0) {
    var task = queue[0];

    if (quantumCount === quantum) {
      // Seleciona o processo com maior prioridade
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].priority > task.priority) {
          task = queue[i];
        }
      }

      queue.splice(queue.indexOf(task), 1);
      queue.splice(0, 0, task);
    }

    if (!tasks[task.id - 1].startExecutionTime) {
      tasks[task.id - 1].startExecutionTime = time + 1;
    }

    setQuantumCount((quantumCount) => quantumCount - 1);
    --task.executionTime;

    if (quantumCount === 1 && task.executionTime > 0) {
      setQuantumCount(quantum);
    }

    // Tira da fila se acabou o tempo de excução
    if (task.executionTime === 0) {
      queue.splice(0, 1);
      tasks[task.id - 1].endExecutionTime = time + 1;
      setQuantumCount(quantum);
    }

    return {
      ...task,
      overload: false,
    };
  }

  return undefined;
};
