import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  public findAll(): string[] {
    return ['A', 'B'];
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
}
