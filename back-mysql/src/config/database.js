const { Sequelize } = require('sequelize');

// Configuração da conexão com MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'crud_app',
  process.env.DB_USER || 'crud_user',
  process.env.DB_PASSWORD || 'crud_password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,      // número máximo de conexões
      min: 0,      // número mínimo de conexões
      acquire: 30000, // tempo máximo para uma conexão
      idle: 10000  // tempo máximo de uma conexão ociosa
    },
    define: {
      timestamps: true,       // cria colunas createdAt e updatedAt
      underscored: false,     // formato colunas: snake_case ou camelCase
      freezeTableName: true   // pluralização automática nome das tabelas
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com MySQL estabelecida com sucesso.');

    // Sincronizar modelos com o banco de dados
    await sequelize.sync({
      force: false, // Não recriar tabelas se já existirem
      alter: process.env.NODE_ENV === 'development' // Alterar estrutura apenas em desenvolvimento
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
