import React from "react";
import { fetchProdutoPorIdDireto } from "@/services/api/server-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductIdPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  // Verificar se o ID é válido
  if (isNaN(id)) {
    notFound();
  }

  try {
    const produto = await fetchProdutoPorIdDireto(id);

    if (!produto) {
      notFound();
    }

    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/produtos"
              className="hover:text-blue-600 transition-colors"
            >
              Produtos
            </Link>
            <span>/</span>
            <span className="text-gray-900">{produto.nome}</span>
          </div>
        </nav>

        {/* Conteúdo do produto */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {produto.nome}
                </h1>
                {produto.importado === 1 && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    Produto Importado
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  R${" "}
                  {produto.preco.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div
                  className={`text-lg font-medium ${
                    produto.estoque > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {produto.estoque > 0
                    ? `${produto.estoque} em estoque`
                    : "Indisponível"}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Descrição
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {produto.descricao}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Informações do Produto
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-medium">#{produto.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origem:</span>
                    <span className="font-medium">
                      {produto.importado === 1 ? "Importado" : "Nacional"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estoque:</span>
                    <span className="font-medium">
                      {produto.estoque} unidades
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Ações</h3>
                <div className="space-y-3">
                  <button
                    className={`w-full py-3 px-4 rounded-md font-medium text-lg transition-colors duration-200 ${
                      produto.estoque > 0
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={produto.estoque === 0}
                  >
                    {produto.estoque > 0
                      ? "Adicionar ao Carrinho"
                      : "Indisponível"}
                  </button>
                  <Link
                    href="/produtos"
                    className="block w-full py-3 px-4 rounded-md font-medium text-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-center transition-colors duration-200"
                  >
                    Voltar aos Produtos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar produto:", error);
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-xl font-semibold text-red-800 mb-2">
            Erro ao carregar produto
          </h1>
          <p className="text-red-600">
            Não foi possível carregar as informações do produto. Tente novamente
            mais tarde.
          </p>
          <Link
            href="/produtos"
            className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Voltar aos Produtos
          </Link>
        </div>
      </div>
    );
  }
};

export default ProductIdPage;
