import nodemailer from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'express-handlebars';
import nodemailer_handlebars from 'nodemailer-express-handlebars';
import mail from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mail;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailer_handlebars({
        viewEngine: handlebars.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mail.default,
      ...message,
    });
  }
}

export default new Mail();
