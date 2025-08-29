const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      freezeTableName: true
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com MySQL estabelecida com sucesso.');

    // Sincronizar modelos com o banco de dados
    // force: true → recria tabelas se necessário (apagar depois de testar)
    await sequelize.sync({
      alter: true,
      force: false,      // não apaga dados existentes
      // colocar true apenas na primeira vez para criar a tabela
      alter: process.env.NODE_ENV === 'development'
    });

    console.log('✅ Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('❌ Erro ao conectar com MySQL:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await sequelize.close();
    console.log('🔌 Conexão com MySQL fechada devido ao encerramento da aplicação');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fechar conexão:', error);
    process.exit(1);
  }
});

module.exports = { sequelize, connectDB };
