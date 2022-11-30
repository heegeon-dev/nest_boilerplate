import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Mailer {
  constructor(private configService: ConfigService) {}

  async sendMail(mailOptions: Mail.Options) {
    let transporter = createTransport({
      host: this.configService.get<string>('email.host'),
      port: this.configService.get<number>('email.port'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.password'),
      },
    });
    try {
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
    }
  }
}
