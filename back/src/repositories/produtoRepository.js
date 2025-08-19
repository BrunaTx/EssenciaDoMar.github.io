let produtos = [];
let currentId = 1;

class ProdutoRepository {
  create(produto) {
    const novoProduto = { id: currentId++, ...produto };
    produtos.push(novoProduto);
    return novoProduto;
  }

  findAll() {
    return produtos;
  }

  findById(id) {
    return produtos.find(produto => produto.id === id);
  }

  update(id, updatedProduto) {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
      produtos[index] = { ...produtos[index], ...updatedProduto, id };
      return produtos[index];
    }
    return null;
  }

  delete(id) {
    const initialLength = produtos.length;
    produtos = produtos.filter(produto => produto.id !== id);
    return produtos.length < initialLength;
  }
}

module.exports = new ProdutoRepository();
