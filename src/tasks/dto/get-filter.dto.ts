import { Type } from 'class-transformer';
import { statusTask } from '../enum/status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([statusTask.OPEN, statusTask.FAILED])
  status: statusTask;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
