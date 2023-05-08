import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
//import { Task } from './interface/task.interface';
import { createTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: createTaskDto) {
    const { name, description, status } = createTaskDto;
    const task = await this.taskModel.create({
      name,
      description,
    });
  }

  async findAll(search: string): Promise<createTaskDto[]> {
    const result = await this.taskModel.find().exec();
    if (search)
      return result.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase()),
      );

    return result;
  }

  async findOne(id: number): Promise<String> {
    return this.taskModel.findById(id);
  }

  async findOneAndUpdate(id: number, createTaskDto: createTaskDto) {
    const exixstTask = await this.taskModel.findById(id);
    if (!exixstTask) {
      throw new NotFoundException(`tas id:${id}not found`);
    }
    return this.taskModel.findByIdAndUpdate(id, createTaskDto, {
      new: true,
    });
  }
  async findOneAndDelete(id: number | string): Promise<String> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
