"use client";

import React from "react";
import { ActionAddProduct, FormState } from "../action/ActionAddProduct";
import { useActionState } from "react";

const initialState: FormState = {
  success: false,
  message: "",
};

const FormAddProduct = () => {
  const [state, formAction] = useActionState(ActionAddProduct, initialState);

  return (
    <form
      key={state.success ? "success" : "form"}
      action={formAction}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Adicionar Produto
      </h2>

      {state.message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            state.success
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Nome
        </label>
        <input
          type="text"
          name="nome"
          id="nome"
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            state.errors?.nome
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />
        {state.errors?.nome && (
          <p className="mt-1 text-sm text-red-600">{state.errors.nome}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="preco"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Preço (R$)
        </label>
        <input
          type="number"
          name="preco"
          id="preco"
          min="0"
          step="0.01"
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            state.errors?.preco
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />
        {state.errors?.preco && (
          <p className="mt-1 text-sm text-red-600">{state.errors.preco}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="descricao"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Descrição
        </label>
        <textarea
          name="descricao"
          id="descricao"
          rows={3}
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical ${
            state.errors?.descricao
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />
        {state.errors?.descricao && (
          <p className="mt-1 text-sm text-red-600">{state.errors.descricao}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="estoque"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Estoque
        </label>
        <input
          type="number"
          name="estoque"
          id="estoque"
          min="0"
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            state.errors?.estoque
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />
        {state.errors?.estoque && (
          <p className="mt-1 text-sm text-red-600">{state.errors.estoque}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="importado"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Importado
        </label>
        <select
          name="importado"
          id="importado"
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
  );
};

export default FormAddProduct;
