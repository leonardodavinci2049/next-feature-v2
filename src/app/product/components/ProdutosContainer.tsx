import { fetchProdutos } from "@/services/api/server-fetch";
import ProdutosList from "./ProdutosList";

export default async function ProdutosContainer() {
  try {
    const produtos = await fetchProdutos();
    return <ProdutosList produtos={produtos} />;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Erro ao carregar produtos
        </h2>
        <p className="text-muted-foreground mb-6">
          Não foi possível carregar os produtos. Tente novamente mais tarde.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }
}
