import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import LoadingProdutos from "./components/LoadingProdutos";
import ProdutosContainer from "./components/ProdutosContainer";

// Forçar renderização dinâmica
export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
              <p className="text-muted-foreground">
                Gerencie todos os seus produtos aqui
              </p>
            </div>
            <Link href="/produtos/addProduct">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Novo Produto
              </Button>
            </Link>
          </div>

          <Suspense fallback={<LoadingProdutos />}>
            <ProdutosContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
