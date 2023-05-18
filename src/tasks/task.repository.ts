import { Order } from 'common/enum/order.enum';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { TaskStatus } from './task-status.enum';
import { ReadTasksFilterDto } from './dto/read-tasks-filter.dto';
import { User } from '../auth/user.entity';
import {
  Logger,
  InternalServerErrorException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async readTasks(
    { status, search, take, skip, order, fieldName }: ReadTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const query = Task.createQueryBuilder('task').take(take).skip(skip);

    query
      .where('task.userId = :userId', { userId: user.id })
      .orderBy('task.id', order);

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
  async findTask(id: string) {
    try {
      const task = await Task.findOneBy({ id });
      if (!task) {
        throw new NotFoundException(`task with id: ${id} not found`);
      }
      return task;
    } catch (err) {
      throw new NotFoundException(`task with ${id} not found`);
    }
  }

  async createNewTask(
    { title, description, status }: CreateNewTaskDto,
    user: User,
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = status;
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

  async deleteTask(id: string) {
    try {
      const task = await this.findTask(id);

      Task.delete(id);
      return task;
    } catch (err) {
      throw new NotFoundException(`task with ${id} not found`);
    }
  }

  async UpdateTaskStatus(id: string, status: TaskStatus, user: User) {
    try {
      const task = await this.findTask(id);

      task.status = status;
      await task.save();
      return task;
    } catch (err) {
      throw new NotFoundException(`task with ${id} not found`);
    }
  }
}
