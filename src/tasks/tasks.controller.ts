import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { ReadTasksFilterDto } from './dto/read-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { ReadUser } from '../auth/read-user.decorator';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(
    @Body() newTaskDto: CreateNewTaskDto,
    @ReadUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `Creating new tasks for the User ${
        user.username
      }. Created Data: ${JSON.stringify(newTaskDto)}`,
    );
    return this.tasksService.createNewTask(newTaskDto, user);
  }

  @Get()
  readTasks(
    @Query(ValidationPipe) filterDto: ReadTasksFilterDto,
    @ReadUser() user: User,
  ) {
    this.logger.verbose(
      `Reading tasks for the User ${
        user.username
      } with filters: ${JSON.stringify(filterDto)}.`,
    );
    return this.tasksService.readTasks(filterDto, user);
  }

  @Get('/:id')
  readTaskById(@Param('id') id: string, @ReadUser() user: User): Promise<Task> {
    this.logger.verbose(
      `Reading task for the User ${user.username} with id: ${id}.`,
    );
    return this.tasksService.readTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @ReadUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `Updating task status for the User ${user.username} with id: ${id}. Updated Status: ${status}`,
    );
    return this.tasksService.updateTaskStatusById(id, status, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @ReadUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Deleting task status for the User ${user.username} with id: ${id}.`,
    );
    return this.tasksService.deleteTaskById(id, user);
  }
}
