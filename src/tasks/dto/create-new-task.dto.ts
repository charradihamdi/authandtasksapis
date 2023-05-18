import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isIn } from 'class-validator';
import { TaskStatus } from 'tasks/task-status.enum';

export class CreateNewTaskDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  status: TaskStatus;
}
