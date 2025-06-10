import { Produto } from "@/services/api/server-fetch";
import ProdutoCard from "./ProdutoCard";


interface ProdutosListProps {
  produtos: Produto[];
}

export default function ProdutosList({ produtos }: ProdutosListProps) {
  if (!produtos || produtos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Nossos Produtos
        </h1>
        <p className="text-gray-600">
          Encontrados {produtos.length} produtos disponíveis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}
