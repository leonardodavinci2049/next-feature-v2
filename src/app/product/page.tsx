
import ProdutosList from "@/app/product/components/ProdutosList";

import { Button } from "@/components/ui/button";
import { fetchProdutos } from "@/services/api/server-fetch";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import LoadingProdutos from "./components/LoadingProdutos";

const page = async () => {
  try {
    const produtos = await fetchProdutos();

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
              <Link href="/product/addProduct">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Novo Produto
                </Button>
              </Link>
            </div>

            <Suspense fallback={<LoadingProdutos />}>
              <ProdutosList produtos={produtos} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
     

        <div className="space-y-4">
      

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Erro ao carregar produtos
              </h1>
              <p className="text-muted-foreground mb-6">
                Não foi possível carregar os produtos. Tente novamente mais
                tarde.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
