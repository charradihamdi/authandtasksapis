import { IsNotEmpty, isIn } from 'class-validator';
import { TaskStatus } from 'tasks/task-status.enum';

export class CreateNewTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: TaskStatus;
}
