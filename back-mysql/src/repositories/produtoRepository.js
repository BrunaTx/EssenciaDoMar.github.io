const Produto = require('../models/Produto');
const { Op } = require('sequelize');

class ProdutoRepository {
  async create(produtoData) {
    try {
      return await Produto.create(produtoData);
    } catch (error) {
      throw error;
    }
  }

  async findAll(options = {}) {
    try {
      const { limit, offset, order } = options;
      return await Produto.findAll({
        limit,
        offset,
        order: order || [['createdAt', 'DESC']],
        attributes: { exclude: [] } // Incluir todos os campos
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await Produto.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async findByNome(nome) {
    try {
      return await Produto.findOne({
        where: {
          nome: nome.trim()
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      const [updatedRowsCount] = await Produto.update(updateData, {
        where: { id },
        returning: true
      });

      if (updatedRowsCount === 0) {
        return null;
      }

      // Buscar o registro atualizado
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedRowsCount = await Produto.destroy({
        where: { id }
      });
      return deletedRowsCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async count(whereCondition = {}) {
    try {
      return await Produto.count({
        where: whereCondition
      });
    } catch (error) {
      throw error;
    }
  }

  async findAndCountAll(options = {}) {
    try {
      const { limit, offset, where, order } = options;
      return await Produto.findAndCountAll({
        where,
        limit,
        offset,
        order: order || [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw error;
    }
  }

  async search(searchTerm, options = {}) {
    try {
      const { limit, offset } = options;
      return await Produto.findAll({
        where: {
          [Op.or]: [
            {
              nome: {
                [Op.like]: `%${searchTerm}%`
              }
            },
            {
              descricao: {
                [Op.like]: `%${searchTerm}%`
              }
            }
          ]
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProdutoRepository();
