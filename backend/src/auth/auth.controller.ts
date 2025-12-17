import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './enteties/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.logout(refreshTokenDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @Post('activate')
  async activate(
    @Query('token') token: string,
    @Body() activateTokenDto: ActivateAccountDto,
  ) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    if (activateTokenDto.password !== activateTokenDto.confirmPassword) {
      throw new BadRequestException('Password do not match');
    }

    await this.authService.activate(token, activateTokenDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-assignment
    const { password, ...safe } = user as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return safe;
  }
}
