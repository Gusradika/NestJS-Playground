import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }

  @Get('/:id')
  public findOne(@Param('id') id: string): ITask {
    const task = this.taskService.findOne(id);
    if (task) {
      return task;
    }
    throw new NotFoundException();
  }
}

//   Routing
//   @Get('/:id')
//   public findOne(@Param() params: any): string {
//     return `The number is ${params.id}`;
//   }
//   Routing COntoh 2
//   @Get('/:id')
//   public findOne(@Param('id') id: string): string {
//     return `The number is ${id}`;
//   }
