import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // O el servicio de tu preferencia
      auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASS
      }
    });
  }

  async sendEmail(email, ticket) {
   
    const mailOptions = {
      from: config.EMAIL,
      to: email,
      subject: 'Confirmación de compra',
      html: `
        <h1>Ticket de compra</h1>
        <p>Codigo: ${ticket.code}</p>
        <p>Fecha: ${ticket.purchase_datetime}</p>
        <p>Total: $${ticket.amount}</p>
        <h2>Productos:</h2>
        <ul>
          ${ticket.detail.map(item => `
            <li>
              ${item.product.title} - Cantidad: ${item.quantity} - Total: $${item.total}
            </li>
          `).join('')}
        </ul>
    `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.log('Error enviando correo:', error);
    }
  }
}

export const mailService = new MailService();
