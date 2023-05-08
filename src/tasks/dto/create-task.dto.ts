import Joi from 'joi';
import { IsString, IsInt } from 'class-validator';
// export const createTaskSchema = Joi.object().keys({
//   name: Joi.string().required(),
//   description: Joi.number().required(),
//   status: Joi.string().required(),
// });
import { ApiProperty } from '@nestjs/swagger';
export class createTaskDto {
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
