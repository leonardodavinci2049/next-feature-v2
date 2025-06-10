"use client";
import { Produto } from '@/services/api/server-fetch';
import React, { useState } from 'react'

interface ProductForm {
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  importado: number;
}

const FormAddProduct = () => {
  const [formData, setFormData] = useState<ProductForm>({
    nome: '',
    preco: 0,
    descricao: '',
    estoque: 0,
    importado: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nome' || name === 'descricao' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do produto:', formData);
    const data: Produto = {
      id: Date.now(), // Simulando um ID único
      nome: formData.nome,
      preco: formData.preco,
      descricao: formData.descricao,
      estoque: formData.estoque,
      importado: formData.importado
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Adicionar Produto</h2>
      
      <div className="mb-4">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          id="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="preco" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preço (R$)
        </label>
        <input
          type="number"
          name="preco"
          id="preco"
          value={formData.preco}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Descrição
        </label>
        <textarea
          name="descricao"
          id="descricao"
          value={formData.descricao}
          onChange={handleChange}
          rows={3}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="estoque" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Estoque
        </label>
        <input
          type="number"
          name="estoque"
          id="estoque"
          value={formData.estoque}
          onChange={handleChange}
          min="0"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="importado" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Importado (0 = Não, 1 = Sim)
        </label>
        <select
          name="importado"
          id="importado"
          value={formData.importado}
          onChange={(e) => setFormData(prev => ({ ...prev, importado: Number(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value={0}>Não</option>
          <option value={1}>Sim</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Adicionar Produto
      </button>
    </form>
  )
}

export default FormAddProduct