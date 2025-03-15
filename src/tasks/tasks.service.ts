import { CreateTaskDTO } from './create-task.dto';
import { Injectable } from '@nestjs/common';
import { ITask } from './task.model';
import { randomUUID } from 'crypto';

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
}
