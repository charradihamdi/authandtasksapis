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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { number } from 'joi';
import { TaskEntity } from './entity/task.entity';
import { TaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/get-filter.dto';
import { ToUpperCasePipe } from './pipes/to-upper-case/to-upper-case.pipe';
@Controller('tasks')
export class TasksController {
  private Logger = new Logger('task controller');
  constructor(private taskService: TasksService) {}
  // @Post()
  // // @ApiResponse({
  // //   status: 201,
  // //   description: 'The Task has been successfully created.',
  // // })
  // //@ApiResponse({ status: 403, description: 'Forbidden.' })
  // async create(@Body(ToUpperCasePipe) createTaskDto: createTaskDto) {
  //   const { name, description, status } = createTaskDto;
  //   return this.taskService.createTask(createTaskDto);
  // }
  @Get()
  async findAll(
    filterDto: GetTaskFilterDto,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ): Promise<TaskEntity[]> {
    return this.taskService.findAll(filterDto);
  }
  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  // @Put(':id')
  // async findOneAndUpdate(
  //   @Param('id')
  //   id: number,
  //   @Body()
  //   createTaskDto: createTaskDto,
  // ) {
  //   return this.taskService.findOneAndUpdate(id, createTaskDto);
  // }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id')
    id: number,
  ) {
    return this.taskService.delete(id);
  }
}
