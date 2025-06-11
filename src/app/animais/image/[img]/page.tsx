import React, { Suspense } from "react";
import { getAnimal } from "@/services/api/animais";
import AnimalImageView from "./components/animal-image-view";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface AnimalImagePageProps {
  params: Promise<{
    img: string;
  }>;
}

/**
 * Gera metadados dinâmicos para a página de imagem do animal
 */
export async function generateMetadata(
  props: AnimalImagePageProps
): Promise<Metadata> {
  const params = await props.params;
  const animalId = params.img;

  try {
    const animal = await getAnimal(animalId);

    return {
      title: `${animal.nome} - Imagem Detalhada`,
      description: `Veja a imagem detalhada de ${animal.nome}. ${animal.descricao}`,
      openGraph: {
        title: `${animal.nome} - Imagem Detalhada`,
        description: `Veja a imagem detalhada de ${animal.nome}. ${animal.descricao}`,
        images: [
          {
            url: animal.imagem,
            alt: `Imagem de ${animal.nome}`,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Animal não encontrado",
      description: "O animal solicitado não foi encontrado.",
    };
  }
}

/**
 * Página para exibir a imagem detalhada de um animal
 * Server Component que busca os dados do animal
 */
const AnimalImagePage = async (props: AnimalImagePageProps) => {
  const params = await props.params;
  const animalId = params.img;

  // Validar se o ID é válido
  if (!animalId || isNaN(Number(animalId))) {
    notFound();
  }

  try {
    const animal = await getAnimal(animalId);

    return (
      <div className="min-h-screen bg-gray-50">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Carregando imagem...</p>
              </div>
            </div>
          }
        >
          <AnimalImageView animal={animal} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar animal:", error);
    notFound();
  }
};

export default AnimalImagePage;
