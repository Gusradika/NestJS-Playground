import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDTO } from './create-task.dto';

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

  @Post()
  public create(@Body() CreateTaskDTO: any) {
    return this.TasksService.create(CreateTaskDTO);
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
