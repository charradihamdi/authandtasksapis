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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { number } from 'joi';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Task has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTaskDto: createTaskDto) {
    const { name, description, status } = createTaskDto;
    console.log(name);
    return this.taskService.create(createTaskDto);
  }
  @Get()
  async findAll(@Query('search') search?: string) {
    console.log(search);
    return this.taskService.findAll(search);
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  async findOneAndUpdate(
    @Param('id')
    id: number,
    @Body()
    createTaskDto: createTaskDto,
  ) {
    return this.taskService.findOneAndUpdate(id, createTaskDto);
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id')
    id: number | string,
  ) {
    return this.taskService.findOneAndDelete(id);
  }
}
