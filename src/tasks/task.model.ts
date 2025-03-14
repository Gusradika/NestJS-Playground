export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// Safety enum value
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS', // 1
  DONE = 'DONE', // 2
}
