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
    { status, search, take, skip }: ReadTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    console.log('take,skip', typeof take, typeof skip);
    const query = Task.createQueryBuilder('task').take(2).skip(0);

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
  async findTask(id: string) {
    try {
      const taskD = await Task.findOneBy({ id });
      console.log(taskD);
      const query = Task.createQueryBuilder('task');
      query.andWhere('task.id = :id', { id });
      const task = await query.getMany();
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
}
