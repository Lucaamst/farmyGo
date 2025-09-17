import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Consegna', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    indirizzo: { type: DataTypes.STRING, allowNull: false },
    stato: { 
      type: DataTypes.ENUM('assegnata', 'consegnata'),
      defaultValue: 'assegnata'
    }
  });
};