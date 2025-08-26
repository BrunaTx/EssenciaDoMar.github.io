const express = require("express");
const { connectDB } = require("./config/database");
const produtoRoutes = require("./routes/produtoRoutes");
const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware para parsear JSON no corpo das requisições
app.use(express.json({ limit: '10mb' }));

// Middleware para parsear dados de formulário URL-encoded
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para CORS (se necessário)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Rota de saúde da aplicação
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Aplicação funcionando corretamente',
    timestamp: new Date().toISOString(),
    database: 'MySQL',
    version: '1.0.0'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API CRUD com Node.js, Express e MySQL',
    endpoints: {
      health: '/health',
      produtos: '/api/produtos',
      documentation: 'Consulte o README para mais informações'
    }
  });
});

// Monta as rotas de usuário sob o prefixo /api
app.use("/api", produtoRoutes);

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Middleware de tratamento de erros genérico
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err.stack);

  // Erro de validação do Sequelize
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(error => error.message);
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: messages
    });
  }

  // Erro de constraint única do Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Violação de restrição única',
      field: err.errors[0]?.path || 'unknown'
    });
  }

  // Erro de conexão com banco de dados
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      success: false,
      message: 'Erro de conexão com o banco de dados'
    });
  }

  // Erro de sintaxe SQL
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      success: false,
      message: 'Erro interno do banco de dados'
    });
  }

  // Erro genérico
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

module.exports = app;
