import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Azienda', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false }
  });
};