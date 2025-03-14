import { CreateTaskDTO } from './create-task.dto';
import { Injectable } from '@nestjs/common';
import { ITask } from './task.model';
import { TasksModule } from './tasks.module';
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

  create(CreateTaskDTO: CreateTaskDTO): ITask {
    const task: ITask = {
      id: randomUUID(),
      ...CreateTaskDTO,
    };

    this.tasks.push(task);
    return task;
  }
}
