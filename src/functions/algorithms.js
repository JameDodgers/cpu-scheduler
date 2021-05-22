export const fifo = (queue) => {
  if (queue.length > 0) {
    const task = queue[0];

    --task.executionTime;

    if (task.executionTime === 0) {
      queue.splice(0, 1);
    }
    return task;
  }

  return undefined
};

// SJF (Shortest Job First) - retorna para o processador a tarefa mais curta na fila de tarefas prontas
export const sjf = (tasks) => {
  var shortestTask = tasks[0];
  for (let i = 1; i < tasks.length; i++) {
    if (tasks[i].executionTime < shortestTask.executionTime) {
      shortestTask = tasks[i];
    }
  }
  console.log(shortestTask);
  return shortestTask;
};

// Round Robin - fifo com tempo de quantum
export const roundRobin = (tasks, quantum) => {
  var task;
  var time;
  if (tasks.length > 0) {
    task = tasks.shift();

    if (task.executionTime >= quantum) {
      time = quantum;
      task.executionTime -= quantum;
    } else {
      time = task.executionTime;
      task.executionTime -= quantum;
    }

    if (task.executionTime > 0) tasks.push(task);
  }

  console.log(task);
  console.log(tasks);
  return { task, time };
};

// EDF (Earliest Deadline First) - retorna para o processador a tarefa com menor dealine na fila de prontos
export const edf = (tasks) => {
  return;
};
