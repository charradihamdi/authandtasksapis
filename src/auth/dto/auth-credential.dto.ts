import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  @MaxLength(20)
  username: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords will contain at least one upper case letter, at least one lower case letter, and at least (one number or special character)',
  })
  password: string;
}
