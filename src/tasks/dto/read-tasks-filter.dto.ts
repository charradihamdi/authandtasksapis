import { Transform } from 'class-transformer';
import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { Order } from 'common/enum/order.enum';

export class ReadTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsIn([Order.ASC, Order.DESC])
  order: Order;

  @IsOptional()
  @IsNotEmpty()
  fieldName: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  take: number;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  skip: number;
}
