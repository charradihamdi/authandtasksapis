import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { ReadTasksFilterDto } from './dto/read-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { string } from 'joi';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  readTasks(filterDto: ReadTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.readTasks(filterDto, user);
  }

  async readTaskById(id: string, user: User): Promise<any> {
    return await this.taskRepository.findTask(id);
  }

  createNewTask(newTaskDto: CreateNewTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createNewTask(newTaskDto, user);
  }

  async updateTaskStatusById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.readTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.deleteTask(id);
  }
}
