import { IsNotEmpty } from "class-validator";

export class CreateNewTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
