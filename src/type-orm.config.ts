import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'auth/user.entity';
import { Task } from 'tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5444,
  username: 'postgres',
  password: '123456',
  database: 'tasks',
  entities: ['dist/**/*.entity{.ts,.js}'],
  //entities: [Task, User],
  synchronize: true,
};
