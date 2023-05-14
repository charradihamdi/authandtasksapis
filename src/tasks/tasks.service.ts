import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  readTasks(filterDto: ReadTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.readTasks(filterDto, user);
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
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Task with id: ${id} for user ${user.username} not found for deleting the task.`,
      );
    }
  }
}
