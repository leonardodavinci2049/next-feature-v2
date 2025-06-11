import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Home, Search } from "lucide-react";

/**
 * Metadados para a página 404 de cursos
 */
export const metadata: Metadata = {
  title: "Curso não encontrado | Plataforma de Ensino",
  description:
    "O curso que você está procurando não foi encontrado ou não existe mais.",
  robots: "noindex, nofollow",
};

/**
 * Página 404 específica para a seção de cursos
 */
export const NotFound = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 max-w-md w-full">
          <div className="space-y-6">
            {/* Ícone e código de erro */}
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            </div>

            {/* Mensagem de erro */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Curso não encontrado</h2>
              <p className="text-muted-foreground">
                O curso que você está procurando não existe ou foi removido. Que
                tal explorar outros cursos disponíveis?
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/cursos"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Search className="h-4 w-4" />
                Ver todos os cursos
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Home className="h-4 w-4" />
                Ir para início
              </Link>
            </div>

            {/* Sugestão adicional */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Precisa de ajuda? Entre em contato com nosso suporte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
