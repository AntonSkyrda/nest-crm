import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './enteties/token.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { EnvService } from '../shared/services/env.service';
import { User } from './enteties/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly envService: EnvService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.jwtSecret,
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: {
        jti: payload.jti,
        isBlocked: false,
      },
      relations: ['user'],
    });
    if (!tokenEntity || tokenEntity.user.isBlocked) {
      throw new UnauthorizedException('Token is blocked or invalid');
    }

    return tokenEntity.user;
  }
}
