import {
  formatarTempo,
  getAula,
  getCurso,
  getCursos,
} from "@/services/api/cursos";
import Link from "next/link";

import { notFound } from "next/navigation";

interface AulaPageProps {
  params: Promise<{
    slug: string;
    aulaSlug: string;
  }>;
}

const AulaPage = async ({ params }: AulaPageProps) => {
  try {
    const { slug, aulaSlug } = await params;
    const cursos = await getCursos();
    if (!cursos || cursos.length === 0) {
      notFound();
    }
    const curso = await getCurso(slug);
    const aula = await getAula(slug, aulaSlug);
    if (!aula) {
      notFound();
    }

    // Encontrar a aula anterior e próxima
    const aulaAtualIndex =
      curso.aulas?.findIndex((a) => a.slug === aula.slug) ?? -1;
    const aulaAnterior =
      aulaAtualIndex > 0 ? curso.aulas?.[aulaAtualIndex - 1] : null;
    const proximaAula =
      aulaAtualIndex < (curso.aulas?.length ?? 0) - 1
        ? curso.aulas?.[aulaAtualIndex + 1]
        : null;

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="/cursos"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Cursos
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/cursos/${curso.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {curso.nome}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{aula.nome}</li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Informações da aula */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-lg font-medium">
                {aula.ordem}
              </span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {aula.nome}
                </h1>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {curso.nome}
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {aula.descricao}
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  Duração:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {formatarTempo(aula.tempo)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  Aula:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {aula.ordem} de {curso.total_aulas}
                </span>
              </div>
            </div>
          </div>

          {/* Área de conteúdo da aula */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">Vídeo da Aula</p>
                <p className="text-sm">Conteúdo da aula seria exibido aqui</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Sobre esta aula
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {aula.descricao}
              </p>
            </div>
          </div>

          {/* Navegação entre aulas */}
          <div className="flex justify-between items-center">
            <div>
              {aulaAnterior && (
                <Link
                  href={`/cursos/${curso.slug}/${aulaAnterior.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Anterior
                    </div>
                    <div className="font-medium">{aulaAnterior.nome}</div>
                  </div>
                </Link>
              )}
            </div>

            <Link
              href={`/cursos/${curso.slug}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todas as aulas
            </Link>

            <div>
              {proximaAula && (
                <Link
                  href={`/cursos/${curso.slug}/${proximaAula.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Próxima
                    </div>
                    <div className="font-medium">{proximaAula.nome}</div>
                  </div>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar a aula:", error);
    notFound();
  }
};

// Gerar páginas estáticas para todas as aulas
export async function generateStaticParams() {
  try {
    const cursos = await getCursos();

    const params = [];

    for (const curso of cursos) {
      const cursoCompleto = await getCurso(curso.slug);
      if (cursoCompleto.aulas) {
        for (const aula of cursoCompleto.aulas) {
          params.push({
            slug: curso.slug,
            aulaSlug: aula.slug,
          });
        }
      }
    }

    return params;
  } catch (error) {
    console.error("Erro ao gerar parâmetros estáticos:", error);
    return [];
  }
}

export default AulaPage;
