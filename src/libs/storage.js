export const schedulingAlgorithms = [
  {
    id: 1,
    name: "FIFO",
    preemptive: false,
  },
  {
    id: 2,
    name: "SJF",
    preemptive: false,
  },
  {
    id: 3,
    name: "Round Robin",
    preemptive: true,
  },
  {
    id: 4,
    name: "EDF",
    preemptive: true,
  },
];

export const pagingAlgorithms = [
  {
    id: 1,
    name: "FIFO",
  },
  {
    id: 2,
    name: "Menos Recentemente Utilizado",
  },
];