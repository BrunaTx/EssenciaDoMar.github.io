const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nome do produto é obrigatório' },
      len: { args: [1, 100], msg: 'Nome do produto deve ter entre 1 e 100 caracteres' }
    }
  },
  descricao: {
    type: DataTypes.STRING(1000),
    allowNull: true,
    validate: {
      len: { args: [0, 1000], msg: 'Descrição deve ter no máximo 1000 caracteres' }
    }
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'Preço deve ser um número decimal' },
      min: { args: [0], msg: 'Preço não pode ser negativo' }
    }
  },
  quantidade: {
    type: DataTypes.DECIMAL(10, 3), // aceita unidades inteiras ou kg com 3 casas decimais
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'Quantidade não pode ser negativa' }
    }
  }
}, {
  tableName: 'produtos',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['nome'] }
  ]
});

module.exports = Produto;
