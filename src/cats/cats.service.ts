import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }


  async findOne(id: number): Promise<String> {
    if (id) {
      return `cat ${id}`;
    }
  }

}
