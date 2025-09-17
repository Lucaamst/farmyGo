import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendNotification = async (tipo, text) => {
  try {
    if (tipo === 'sms') {
      await client.messages.create({
        body: text,
        from: process.env.TWILIO_FROM_SMS,
        to: '+39XXXXXXXXXX' // Numero cliente da sostituire dinamicamente
      });
    } else if (tipo === 'whatsapp') {
      await client.messages.create({
        body: text,
        from: `whatsapp:${process.env.TWILIO_FROM_WHATSAPP}`,
        to: `whatsapp:+39XXXXXXXXXX` // Numero cliente da sostituire dinamicamente
      });
    }
  } catch (error) {
    console.error('Errore invio notifica:', error);
  }
};