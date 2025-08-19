const produtoService = require("../services/produtoService");

class ProdutoController {
  async createProduto(req, res) {
    try {
      const novoProduto = await produtoService.createProduto(req.body);
      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllProdutos(req, res) {
    try {
      const produtos = await produtoService.getAllProdutos();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProdutoById(req, res) {
    try {
      const produto = await produtoService.getProdutoById(req.params.id);
      res.status(200).json(produto);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateProduto(req, res) {
    try {
      const updatedProduto = await produtoService.updateProduto(req.params.id, req.body);
      res.status(200).json(updatedProduto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduto(req, res) {
    try {
      const result = await produtoService.deleteProduto(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new ProdutoController();
