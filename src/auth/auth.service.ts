import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload-interface';
import { JwtAccessToken } from './jwt-access-token-interface';
import { ConfigServiceRoot } from 'common/configurations';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
    private config: ConfigServiceRoot,
  ) {}

  signupUser(credentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createNewUser(credentialsDto);
  }

  async loginUser(credentialsDto: AuthCredentialsDto): Promise<JwtAccessToken> {
    const username = await this.userRepository.validateUserPassword(
      credentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid username.');
    }
    const payload: JwtPayload = { username };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'rtoken',
      expiresIn: '1y',
    });
    this.logger.debug(` JWT token : ${JSON.stringify(accessToken)}`);
    return { accessToken, refreshToken };
  }
  async refreshToken(username: string) {
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
