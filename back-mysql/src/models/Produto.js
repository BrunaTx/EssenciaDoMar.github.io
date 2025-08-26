const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Nome do produto é obrigatório'
      },
      len: {
        args: [2, 50],
        msg: 'Nome do produto deve ter entre 2 e 50 caracteres'
      }
    }
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      len: {
        args: [0, 255],
        msg: 'Descrição deve ter no máximo 255 caracteres'
      }
    }
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'Preço deve ser um número decimal'
      },
      min: {
        args: [0],
        msg: 'Preço não pode ser negativo'
      }
    }
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Estoque deve ser um número inteiro'
      },
      min: {
        args: [0],
        msg: 'Estoque não pode ser negativo'
      }
    }
  }
}, {
  tableName: 'produtos',
  timestamps: true, // Adiciona createdAt e updatedAt
  indexes: [
    {
      unique: true,
      fields: ['nome']
    }
  ]
});

module.exports = Produto;
