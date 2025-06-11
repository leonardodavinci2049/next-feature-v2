import { formatarTempo, getCurso, getCursos } from "@/services/api/cursos";
import Link from "next/link";

import { notFound } from "next/navigation";

interface CursoPageProps {
  params: {
    slug: string;
  };
}

const CursoPage = async ({ params }: CursoPageProps) => {
  try {
    const curso = await getCurso(params.slug);

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
            <li className="text-gray-900 dark:text-white">{curso.nome}</li>
          </ol>
        </nav>

        {/* Informações do curso */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {curso.nome}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {curso.descricao}
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-white">
                Aulas:
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {curso.total_aulas}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-white">
                Duração:
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {formatarTempo(curso.total_horas * 60)}
              </span>
            </div>
          </div>
        </div>

        {/* Lista de aulas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Aulas do Curso
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {curso.aulas?.map((aula) => (
              <Link
                key={aula.id}
                href={`/cursos/${curso.slug}/${aula.slug}`}
                className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        {aula.ordem}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {aula.nome}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 ml-11">
                      {aula.descricao}
                    </p>
                  </div>

                  <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatarTempo(aula.tempo)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar curso:", error);
    notFound();
  }
};

// Gerar páginas estáticas para todos os cursos
export async function generateStaticParams() {
  try {

    const cursos = await getCursos();

    return cursos.map((curso) => ({
      slug: curso.slug,
    }));
  } catch (error) {
    console.error("Erro ao gerar parâmetros estáticos:", error);
    return [];
  }
}

export default CursoPage;
