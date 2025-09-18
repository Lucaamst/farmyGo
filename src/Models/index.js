import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // metti true se vuoi vedere le query
  }
);

// Test connessione
try {
  await sequelize.authenticate();
  console.log('✅ Connessione al database avvenuta con successo.');
} catch (error) {
  console.error('❌ Errore di connessione al database:', error);
}

export default sequelize;
