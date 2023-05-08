import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UsePipes,
  Post,
  Query,
  Param,
  Body,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { ForbiddenException } from './forbidden.exception';
import { HttpExceptionFilter } from './FILTERS/http-exception.filter';
import { JoiValidationPipe } from './Validator/validator.schema';
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  //    @UseFilters(new HttpExceptionFilter());
  async create(@Body() createCatDto: CreateCatDto) {
    // throw new ForbiddenException();
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    try {
      await this.catsService.findAll();
    } catch (error) {
      throw new ForbiddenException();
      // HttpException({
      //     status:HttpStatus.FORBIDDEN,
      //     error:'this is a custom message',
      // },HttpStatus.FORBIDDEN,{
      //     cause: error
      // })
    }
  }
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
}
