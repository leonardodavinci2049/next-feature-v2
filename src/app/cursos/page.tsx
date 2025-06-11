import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Clock, Play } from "lucide-react";
import { formatarTempo, getCursos } from "@/services/api/cursos";

/**
 * Gera metadados estáticos para a página de cursos
 */
export const metadata: Metadata = {
  title: "Cursos | Plataforma de Ensino",
  description:
    "Explore nossa coleção completa de cursos online. Aprenda no seu ritmo com conteúdo de qualidade e instrutores especializados.",
  keywords: ["cursos", "educação", "aprendizado", "online", "ensino"],
  openGraph: {
    title: "Cursos | Plataforma de Ensino",
    description:
      "Explore nossa coleção completa de cursos online. Aprenda no seu ritmo com conteúdo de qualidade.",
    type: "website",
    siteName: "Plataforma de Ensino",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos | Plataforma de Ensino",
    description:
      "Explore nossa coleção completa de cursos online. Aprenda no seu ritmo com conteúdo de qualidade.",
  },
};

const CursosPage = async () => {
  try {
    const cursos = await getCursos();

    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Nossos Cursos
                </h1>
                <p className="text-muted-foreground">
                  Explore nossa coleção de cursos disponíveis
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <Link
                  key={curso.id}
                  href={`/cursos/${curso.slug}`}
                  className="block p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">{curso.nome}</h2>
                    </div>

                    <p className="text-muted-foreground text-sm">
                      {curso.descricao}
                    </p>

                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        <span>{curso.total_aulas} aulas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatarTempo(curso.total_horas * 60)}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Ver curso →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Erro ao carregar cursos
              </h1>
              <p className="text-muted-foreground">
                Não foi possível carregar a lista de cursos. Tente novamente
                mais tarde.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CursosPage;
