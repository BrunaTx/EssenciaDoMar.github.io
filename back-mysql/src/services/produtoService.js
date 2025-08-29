const produtoRepository = require("../repositories/produtoRepository");
const { ValidationError, UniqueConstraintError } = require("sequelize");

class ProdutoService {
  // Criar produto
  async createProduto(produtoData) {
    try {
      // Validação básica
      if (!produtoData.nome || produtoData.preco == null || produtoData.quantidade == null) {
        throw new Error("Nome, preço quantidade são obrigatórios.");
      }

      // Verificar duplicidade pelo nome
      const existingProduto = await produtoRepository.findByNome(produtoData.nome);
      if (existingProduto) {
        throw new Error("Nome do produto já está em uso.");
      }

      // Criar
      return await produtoRepository.create(produtoData);

    } catch (error) {
      // Tratamento de erros do Sequelize
      if (error instanceof ValidationError) {
        const messages = error.errors.map(err => err.message);
        throw new Error(messages.join(". "));
      }
      if (error instanceof UniqueConstraintError) {
        throw new Error("Nome do produto já está em uso.");
      }
      throw error;
    }
  }

  // Buscar todos os produtos (com paginação opcional)
  async getAllProdutos(options = {}) {
    try {
      const { page, limit } = options;
      if (page && limit) {
        const offset = (page - 1) * limit;
        return await produtoRepository.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
        });
      }
      return await produtoRepository.findAll();
    } catch (error) {
      throw new Error("Erro ao buscar produtos: " + error.message);
    }
  }

  // Buscar por ID
  async getProdutoById(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID de produto inválido.");
      }
      const produto = await produtoRepository.findById(parseInt(id));
      if (!produto) {
        throw new Error("Produto não encontrado.");
      }
      return produto;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar
  async updateProduto(id, produtoData) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID de produto inválido.");
      }

      if (!produtoData.nome && produtoData.preco == null && produtoData.quantidade == null) {
        throw new Error("Pelo menos um campo (nome, preço e quantidade) deve ser fornecido.");
      }

      // Se está mudando o nome, verificar duplicidade
      if (produtoData.nome) {
        const existingProduto = await produtoRepository.findByNome(produtoData.nome);
        if (existingProduto && existingProduto.id !== parseInt(id)) {
          throw new Error("Nome do produto já está em uso por outro produto.");
        }
      }

      const updatedProduto = await produtoRepository.update(parseInt(id), produtoData);
      if (!updatedProduto) {
        throw new Error("Produto não encontrado para atualização.");
      }

      return updatedProduto;

    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.errors.map(err => err.message);
        throw new Error(messages.join(". "));
      }
      if (error instanceof UniqueConstraintError) {
        throw new Error("Nome do produto já está em uso por outro produto.");
      }
      throw error;
    }
  }

  // Deletar
  async deleteProduto(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID de produto inválido.");
      }

      const deleted = await produtoRepository.delete(parseInt(id));
      if (!deleted) {
        throw new Error("Produto não encontrado para exclusão.");
      }

      return { message: "Produto deletado com sucesso." };

    } catch (error) {
      throw error;
    }
  }

  // Contar
  async getProdutosCount() {
    try {
      return await produtoRepository.count();
    } catch (error) {
      throw new Error("Erro ao contar produtos: " + error.message);
    }
  }

  // Buscar por termo
  async searchProdutos(searchTerm, options = {}) {
    try {
      if (!searchTerm || searchTerm.trim() === "") {
        throw new Error("Termo de busca é obrigatório.");
      }

      const { page, limit } = options;
      let searchOptions = {};
      if (page && limit) {
        searchOptions.offset = (page - 1) * limit;
        searchOptions.limit = parseInt(limit);
      }

      return await produtoRepository.search(searchTerm.trim(), searchOptions);
    } catch (error) {
      throw new Error("Erro ao buscar produtos: " + error.message);
    }
  }
}

module.exports = new ProdutoService();
