const produtoRepository = require("../repositories/produtoRepository");

class ProdutoService {
  createProduto(produtoData) {
    const { preco, produto, descricao, tipoMedida, quantidadeUnidade, pesoKg } = produtoData;

   
    if (!preco || !produto || !descricao || (tipoMedida === 'unidade' && !quantidadeUnidade) || (tipoMedida === 'kg' && !pesoKg)) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

    const precoNumero = parseFloat(preco.toString().replace(',', '.'));
    if (isNaN(precoNumero)) {
      throw new Error("Preço inválido.");
    }

    const estoque = tipoMedida === 'unidade' ? `${quantidadeUnidade} unidades` : `${pesoKg} Kg`;
    const novoProduto = {
      preco: `R$ ${precoNumero.toFixed(2).replace('.', ',')}`,
      produto,
      descricao,
      estoque,
    };

    return produtoRepository.create(novoProduto);
  }

  getAllProdutos() {
    return produtoRepository.findAll();
  }

  getProdutoById(id) {
    const produto = produtoRepository.findById(parseInt(id));
    if (!produto) {
      throw new Error("Produto não encontrado.");
    }
    return produto;
  }

  updateProduto(id, produtoData) {
    const updatedProduto = produtoRepository.update(parseInt(id), produtoData);
    if (!updatedProduto) {
      throw new Error("Produto não encontrado para atualização.");
    }
    return updatedProduto;
  }

  deleteProduto(id) {
    const deleted = produtoRepository.delete(parseInt(id));
    if (!deleted) {
      throw new Error("Produto não encontrado para exclusão.");
    }
    return { message: "Produto deletado com sucesso." };
  }
}

module.exports = new ProdutoService();
