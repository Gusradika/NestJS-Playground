import { CreateTaskDTO } from './create-task.dto';
import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { randomUUID } from 'crypto';
import { UpdateTaskDTO } from './update-task-opt.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(createTaskDTO: CreateTaskDTO): ITask {
    const task: ITask = {
      id: randomUUID(),
      ...createTaskDTO,
    };

    this.tasks.push(task);
    return task;
  }

  public updateTask(task: ITask, UpdateTaskDTO: UpdateTaskDTO): ITask {
    if (
      UpdateTaskDTO.status &&
      !this.isValidSatusTransition(task.status, UpdateTaskDTO.status)
    ) {
      console.log(task.status, UpdateTaskDTO.status);
      throw new WrongTaskStatusException();
    }
    // Cara mudah untuk menggabungkan dua objek
    Object.assign(task, UpdateTaskDTO);
    return task;
  }

  public delete(task: ITask): void {
    this.tasks = this.tasks.filter(
      (filteredTask) => filteredTask.id !== task.id,
    );
  }

  // Check cannot rewind status
  private isValidSatusTransition(
    currentStatus: TaskStatus,
    newStatus: TaskStatus,
  ): boolean {
    const statusOrder = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];
    console.log(
      statusOrder.indexOf(currentStatus),
      statusOrder.indexOf(newStatus),
    );
    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }
}
