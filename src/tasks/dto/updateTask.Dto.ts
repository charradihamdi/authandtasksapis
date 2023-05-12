import Joi from 'joi';
import { IsString, IsInt } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class UpdateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsInt()
  description: string;
  @IsString()
  @ApiProperty()
  status: string;
}
