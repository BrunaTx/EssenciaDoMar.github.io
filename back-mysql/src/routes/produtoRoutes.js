const express = require("express");
const produtoController = require("../controllers/produtoController");
const router = express.Router();

// Rotas específicas devem vir antes das rotas com parâmetros
router.get("/produtos/count", produtoController.getProdutosCount);
router.get("/produtos/search", produtoController.searchProdutos);
router.post("/produtos", produtoController.createProduto);
router.get("/produtos", produtoController.getAllProdutos);
router.get("/produtos/:id", produtoController.getProdutoById);
router.put("/produtos/:id", produtoController.updateProduto);
router.delete("/produtos/:id", produtoController.deleteProduto);

module.exports = router;
