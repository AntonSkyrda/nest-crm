import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvService } from '../shared/services/env.service';
import fs from 'node:fs/promises';
import path from 'path';
import * as handlebars from 'handlebars';
import { IEmailData } from './interfaces/email-data.interface';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly envService: EnvService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: envService.smtpUser,
        pass: envService.smtpPassword,
      },
    });
  }

  private async renderTemplate(
    templateName: string,
    context: Record<string, any>,
  ): Promise<string> {
    const templateDir = path.join(process.cwd(), 'src', 'mail', 'templates');
    const layoutSource = await fs.readFile(
      path.join(templateDir, 'base.hbs'),
      'utf8',
    );
    const layoutTemplate = handlebars.compile(layoutSource);

    const templateSource = await fs.readFile(
      path.join(templateDir, `${templateName}.hbs`),
      'utf8',
    );
    const childTemplate = handlebars.compile(templateSource);
    const childHtml = childTemplate(context);

    return layoutTemplate({ context, childHtml });
  }

  public async sendEmail(
    to: string,
    emailData: IEmailData,
    context: Record<string, any>,
  ): Promise<void> {
    try {
      const html = await this.renderTemplate(emailData.template, context);
      await this.transporter.sendMail({
        to: to,
        subject: emailData.subject,
        html: html,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Cannot send email');
    }
  }
}
