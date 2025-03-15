import { CreateTaskDTO } from './create-task.dto';
import { Injectable } from '@nestjs/common';
import { ITask } from './task.model';
import { randomUUID } from 'crypto';
import { UpdateTaskDTO } from './update-task-opt.dto';

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
    Object.assign(task, UpdateTaskDTO);
    return task;
  }

  public delete(task: ITask): void {
    this.tasks = this.tasks.filter(
      (filteredTask) => filteredTask.id !== task.id,
    );
  }
}
