import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { JwtAccessToken } from './jwt-access-token-interface';

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
}
