import {
  InternalServerErrorException,
  Logger,
  Injectable,
} from '@nestjs/common';
import { createTaskDto } from 'tasks/dto/create-task.dto';
import { GetTaskFilterDto } from 'tasks/dto/get-filter.dto';
import { TaskEntity } from 'tasks/entity/task.entity';
import { statusTask } from 'tasks/enum/status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  private logger = new Logger('TaskRepository');
  async createTask(createTaskDto: createTaskDto): Promise<TaskEntity> {
    const { name, description } = createTaskDto;
    const task = new TaskEntity();
    task.name = name;
    task.description = description;
    task.status = statusTask.OPEN;
    try {
      await task.save();
    } catch (error) {
      this.logger.error(
        `Failed to create task ": ${JSON.stringify(createTaskDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.name LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user " ,Filters: ${JSON.stringify(filterDto)}`,
      );
      throw new InternalServerErrorException();
    }
  }
}
