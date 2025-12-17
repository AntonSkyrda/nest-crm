import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MailService } from './mail.service';

@Module({
  imports: [SharedModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
