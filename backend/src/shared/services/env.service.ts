import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  public readonly jwtSecret: string;
  public readonly jwtAccessTokenExpireTime: number;
  public readonly jwtRefreshTokenExpireTime: number;
  public readonly jwtActivateTokenExpireTime: number;

  public readonly dbType: string;
  public readonly dbHost: string;
  public readonly dbPort: number;
  public readonly dbUser: string;
  public readonly dbPassword: string;
  public readonly dbName: string;

  public readonly smtpUser: string;
  public readonly smtpPassword: string;
  public readonly smtpHost: string;
  public readonly smtpPort: number;

  public readonly frontendUrl: string;

  public readonly adminEmail: string;
  public readonly adminPassword: string;
  public readonly adminFirstName: string;
  public readonly adminLastName: string;

  constructor(private configService: ConfigService) {
    this.jwtSecret = configService.get<string>('JWT_SECRET') || '';
    this.jwtAccessTokenExpireTime =
      configService.get<number>('JWT_ACCESS_EXPIRE_TIME') || 600;
    this.jwtRefreshTokenExpireTime =
      configService.get<number>('JWT_REFRESH_EXPIRE_TIME') || 0;
    this.jwtActivateTokenExpireTime =
      configService.get<number>('JWT_ACTIVATE_EXPIRE_TIME') || 0;

    this.dbType = configService.get<string>('DB_TYPE') || '';
    this.dbHost = configService.get<string>('DB_HOST') || '';
    this.dbPort = configService.get<number>('DB_PORT') || 3306;
    this.dbUser = configService.get<string>('DB_USER') || '';
    this.dbPassword = configService.get<string>('DB_PASSWORD') || '';
    this.dbName = configService.get<string>('DB_NAME') || '';

    this.smtpUser = configService.get<string>('SMTP_USER') || '';
    this.smtpPassword = configService.get<string>('SMTP_PASSWORD') || '';
    this.smtpHost = configService.get<string>('SMTP_HOST') || '';
    this.smtpPort = configService.get<number>('SMTP_PORT') || 587;

    this.frontendUrl = configService.get<string>('FRONTEND_URL') || '';

    this.adminEmail = configService.get<string>('ADMIN_EMAIL') || '';
    this.adminPassword = configService.get<string>('ADMIN_PASSWORD') || '';
    this.adminFirstName = configService.get<string>('ADMIN_FIRST_NAME') || '';
    this.adminLastName = configService.get<string>('ADMIN_LASTNAME') || '';
  }
}
