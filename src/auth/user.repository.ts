import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  async createNewUser({
    username,
    password,
  }: AuthCredentialsDto): Promise<void> {
    console.log(username);
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      }
      throw new InternalServerErrorException();
    }
  }

  async validateUserPassword({
    username,
    password,
  }: AuthCredentialsDto): Promise<string> {
    const user = await User.findOneBy({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
