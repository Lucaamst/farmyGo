import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './user.js';
import AziendaModel from './azienda.js';
import ConsegnaModel from './consegna.js';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

export const User = UserModel(sequelize);
export const Azienda = AziendaModel(sequelize);
export const Consegna = ConsegnaModel(sequelize);

// Relazioni
Azienda.hasMany(User, { foreignKey: 'aziendaId' });
User.belongsTo(Azienda);

Azienda.hasMany(Consegna, { foreignKey: 'aziendaId' });
Consegna.belongsTo(Azienda);

User.hasMany(Consegna, { foreignKey: 'corriereId' });
Consegna.belongsTo(User, { as: 'corriere', foreignKey: 'corriereId' });

export default sequelize;