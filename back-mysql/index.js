// Carregar variáveis de ambiente
require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 Servidor rodando na porta ${PORT}`);
console.log(`📍 Acesse: http://localhost:${PORT}/api/users`);
console.log(`💚 Health check: http://localhost:${PORT}/health`);
console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
console.log(`🗄️ Banco de dados: MySQL`);
});