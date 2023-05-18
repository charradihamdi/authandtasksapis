import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { JwtAccessToken } from './jwt-access-token-interface';
import { RefreshGuard } from './rt.guard';
import { User } from './user.entity';
import { ReadUser } from './read-user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signupUser(
    @Body(ValidationPipe) credentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    console.log(credentialsDto);
    return this.authService.signupUser(credentialsDto);
  }

  @Post('/login')
  loginUser(
    @Body(ValidationPipe) credentialsDto: AuthCredentialsDto,
  ): Promise<JwtAccessToken> {
    return this.authService.loginUser(credentialsDto);
  }

  @Post('/refresh')
  @UseGuards(RefreshGuard)
  refrech(@ReadUser() user: User) {
    return this.authService.refreshToken(user.username);
  }
}
