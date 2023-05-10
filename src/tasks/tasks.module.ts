import { TaskEntity } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './schemas/task.schema';
import { TaskRepository } from './repository/task.repository';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }]),
    TypeOrmModule.forFeature([TaskEntity, TaskRepository]),
  ],

  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
