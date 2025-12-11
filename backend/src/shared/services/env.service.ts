import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  public readonly jwtSecret: string;
  public readonly jwtAccessTokenExpireTime: number;
  public readonly jwtRefreshTokenExpireTime: number;

  public readonly dbType: string;
  public readonly dbHost: string;
  public readonly dbPort: number;
  public readonly dbUser: string;
  public readonly dbPassword: string;
  public readonly dbName: string;

  constructor(private configService: ConfigService) {
    this.jwtSecret = configService.get<string>('JWT_SECRET') || '';
    this.jwtAccessTokenExpireTime =
      configService.get<number>('JWT_ACCESS_EXPIRE_TIME') || 0;
    this.jwtRefreshTokenExpireTime =
      configService.get<number>('JWT_REFRESH_EXPIRE_TIME') || 0;

    this.dbType = configService.get<string>('DB_TYPE') || '';
    this.dbHost = configService.get<string>('DB_HOST') || '';
    this.dbPort = configService.get<number>('DB_PORT') || 3306;
    this.dbUser = configService.get<string>('DB_USER') || '';
    this.dbPassword = configService.get<string>('DB_PASSWORD') || '';
    this.dbName = configService.get<string>('DB_NAME') || '';
  }
}
