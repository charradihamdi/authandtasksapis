import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  Injectable,
  Scope,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
//import { Task } from './interface/task.interface';
import { createTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import {
  DataSource,
  Repository,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Request } from 'express';
import { TaskRepository } from './repository/task.repository';
import { GetTaskFilterDto } from './dto/get-filter.dto';
import { statusTask } from './enum/status.enum';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  // async createMany(tasks: TaskEntity[]) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager.save(tasks[0]);
  //     await queryRunner.manager.save(tasks[1]);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // findAll(search): Promise<TaskEntity[]> {
  //   const array = this.taskRepository.find();
  //   console.log('array');
  //   return array;
  // }

  // async create(createTaskDto: createTaskDto) {
  //   const { name, description, status } = createTaskDto;
  //   const task = await this.taskModel.create({
  //     name,
  //     description,
  //   });
  // }

  // async findAll(search: string): Promise<createTaskDto[]> {
  //   const result = await this.taskModel.find().exec();
  //   if (search)
  //     return result.filter((task) =>
  //       task.name.toLowerCase().includes(search.toLowerCase()),
  //     );

  //   return result;
  // }

  // async findOne(id: number): Promise<TaskEntity> {
  //   return this.taskRepository.findOneBy({ id });
  // }
  // async findOne(id: number): Promise<String> {
  //   return this.taskModel.findById(id);
  // }

  // async findOneAndUpdate(id: number, createTaskDto: createTaskDto) {
  //   const exixstTask = await this.taskModel.findById(id);
  //   if (!exixstTask) {
  //     throw new NotFoundException(`tas id:${id}not found`);
  //   }
  //   return this.taskModel.findByIdAndUpdate(id, createTaskDto, {
  //     new: true,
  //   });
  // }
  // async findOneAndDelete(id: number): Promise<void> {
  //   await this.taskRepository.delete(id);
  // }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Error......Tasks ${id} Not Found`);
    }
    return found;
  }

  async delete(id: number) {
    const del = await this.taskRepository.delete({ id });
    console.log(del);
    return del;
  }

  async findAll(filterDto: GetTaskFilterDto) {
    return this.taskRepository.find();
  }

  async createTask(createTaskDto: createTaskDto): Promise<any> {
    const { name, description } = createTaskDto;
    const task = new TaskEntity();
    task.name = name;
    task.description = description;
    task.status = statusTask.OPEN;
    try {
      await task.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return task;
  }
}
