import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async testSendMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Test email',
      template: './test', // `.hbs` extension is appended automatically
      context: {
           // ✏️ filling curly brackets with content
      },
    });
  }

  async sendNewPassword(email: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './sendPassword', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        password: password,
      },
    });
  }

}