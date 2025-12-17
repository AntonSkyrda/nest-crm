import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EnvService } from '../shared/services/env.service';
import { DataSource } from 'typeorm';
import { User } from '../auth/enteties/user.entity';
import { RoleEnum } from '../enums/role.enum';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const envService = app.get(EnvService);
    const dataSource = app.get(DataSource);

    const email = envService.adminEmail;
    const password = envService.adminPassword;
    const firstName = envService.adminFirstName ?? 'System';
    const lastName = envService.adminLastName ?? 'Admin';

    if (!email || !password) {
      throw new Error('Admin credentials are not set in EnvService');
    }

    const userRepo = dataSource.getRepository(User);

    const existing = await userRepo.findOne({
      where: { email },
    });

    if (existing) {
      console.log(`Admin already exists: ${email}`);
      return;
    }

    const admin = userRepo.create({
      email,
      password, // буде захешовано хуком User (argon2)
      firstName,
      lastName,
      role: RoleEnum.ADMIN,
      isActive: true,
      isBlocked: false,
    });

    await userRepo.save(admin);

    console.log(`Admin created: ${email}`);
  } catch (error) {
    console.error('Failed to create admin:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
})();
