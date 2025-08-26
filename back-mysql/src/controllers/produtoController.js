const produtoService = require("../services/produtoService");

class ProdutoController {
  async createProduto(req, res) {
    try {
      const newProduto = await produtoService.createProduto(req.body);
      res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso',
        data: newProduto
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAllProdutos(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await produtoService.getAllProdutos({ page, limit });

      // Se foi paginado, retornar com metadados
      if (result.count !== undefined) {
        const totalPages = Math.ceil(result.count / limit);
        res.status(200).json({
          success: true,
          data: result.rows,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: result.count,
            itemsPerPage: parseInt(limit)
          }
        });
      } else {
        res.status(200).json({
          success: true,
          data: result
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getProdutoById(req, res) {
    try {
      const produto = await produtoService.getProdutoById(req.params.id);
      res.status(200).json({
        success: true,
        data: produto
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateProduto(req, res) {
    try {
      const updatedProduto = await produtoService.updateProduto(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: updatedProduto
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteProduto(req, res) {
    try {
      const result = await produtoService.deleteProduto(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getProdutosCount(req, res) {
    try {
      const count = await produtoService.getProdutosCount();
      res.status(200).json({
        success: true,
        data: { count }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async searchProdutos(req, res) {
    try {
      const { q: searchTerm, page, limit } = req.query;
      if (!searchTerm) {
        return res.status(400).json({
          success: false,
          message: 'Parâmetro de busca "q" é obrigatório'
        });
      }
      const produtos = await produtoService.searchProdutos(searchTerm, { page, limit });
      res.status(200).json({
        success: true,
        data: produtos,
        searchTerm
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new ProdutoController();
