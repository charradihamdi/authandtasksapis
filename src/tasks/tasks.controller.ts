import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { number } from 'joi';
import { TaskEntity } from './entity/task.entity';
import { TaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/get-filter.dto';
import { ToUpperCasePipe } from './pipes/to-upper-case/to-upper-case.pipe';
import { AdminGuard } from 'auth/auth.guard.spec';
import { UpdateTaskDto } from './dto/updateTask.Dto';
@Controller('tasks')
export class TasksController {
  private Logger = new Logger('task controller');
  constructor(private taskService: TasksService) {}
  @Post()
  //@UseGuards(AdminGuard)
  // @ApiResponse({
  //   status: 201,
  //   description: 'The Task has been successfully created.',
  // })
  //@ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTaskDto: createTaskDto) {
    const { name, description, status } = createTaskDto;
    console.log(createTaskDto);
    return this.taskService.createTask(createTaskDto);
  }
  @Get()
  async findAll(
    filterDto: GetTaskFilterDto,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ): Promise<TaskEntity[]> {
    this.Logger.log(search);
    return this.taskService.findAll({ search, status });
  }
  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  async findOneAndUpdate(
    @Param('id')
    id: number,
    @Body()
    updateTask: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, updateTask);
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id')
    id: number,
  ) {
    return this.taskService.delete(id);
  }
}
