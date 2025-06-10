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
    <div className="w-full">
      <div className="mb-6">
        <p className="text-muted-foreground">
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
