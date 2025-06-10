"use client";

import { Produto } from "@/services/api/server-fetch";
import Link from "next/link";

interface ProdutoCardProps {
  produto: Produto;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  return (
    <Link href={`/product/${produto.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {produto.nome}
          </h3>
          {produto.importado === 1 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Importado
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {produto.descricao}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">
            R${" "}
            {produto.preco.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

          <div className="text-right">
            <div
              className={`text-sm ${
                produto.estoque > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {produto.estoque > 0
                ? `${produto.estoque} em estoque`
                : "Indisponível"}
            </div>
          </div>
        </div>

        <button
          className={`w-full mt-4 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            produto.estoque > 0
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={produto.estoque === 0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Aqui você pode adicionar lógica para adicionar ao carrinho
            console.log(`Adicionando produto ${produto.id} ao carrinho`);
          }}
        >
          {produto.estoque > 0 ? "Adicionar ao Carrinho" : "Indisponível"}
        </button>
      </div>
    </Link>
  );
}
