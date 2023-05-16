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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private logger = new Logger('TaskRepository'),
  ) {}

  async readTasks(filterDto: ReadTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for the user ${
          user.username
        }, with filters: ${JSON.stringify({ status, search })}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async readTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(
        `Task with id: ${id} for user ${user.username} not found.`,
      );
    }
    return found;
  }

  async createNewTask(newTaskDto: CreateNewTaskDto, user: User): Promise<Task> {
    const task = new Task();
    const { title, description } = newTaskDto;
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    try {
      await task.save();
      delete task.user;
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to create new task for the user ${
          user.username
        }. Requested data for creation: ${JSON.stringify({
          title,
          description,
        })}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
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
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Task with id: ${id} for user ${user.username} not found for deleting the task.`,
      );
    }
  }
}
