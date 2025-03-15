import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Body,
  Patch,
  HttpStatus,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDTO } from './create-task.dto';
import { FindOneParams } from './find-one.params';
// import { UpdateTaskStatusDTO } from './update-task.dto';
import { UpdateTaskDTO } from './update-task-opt.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }

  @Get('/:id')
  public findOne(@Param() params: FindOneParams): ITask {
    return this.findOneOrFail(params.id);
  }

  private findOneOrFail(id: string): ITask {
    const task = this.taskService.findOne(id);
    if (task) {
      return task;
    }

    throw new NotFoundException();
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param() params: FindOneParams): void {
    const task = this.findOneOrFail(params.id);
    this.taskService.delete(task);
  }

  // NOT MAPPED TYPE
  // @Patch('/:id/status')
  // public updateTaskStatus(
  //   @Param() params: FindOneParams,
  //   @Body() body: UpdateTaskStatusDTO,
  // ): ITask {
  //   const task = this.findOneOrFail(params.id);
  //   task.status = body.status;
  //   return task;
  // }
  // MAPPED TYPE
  @Patch('/:id/status')
  public updateTask(
    @Param() params: FindOneParams,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): ITask {
    const task = this.findOneOrFail(params.id);
    return this.taskService.updateTask(task, updateTaskDTO);
  }

  @Post()
  public create(@Body() createTaskDTO: CreateTaskDTO) {
    return this.taskService.create(createTaskDTO);
  }
}
