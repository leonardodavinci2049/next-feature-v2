// Tipos para a API de cursos

export interface Animal {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}
const API_BASE_URL = process.env.API_URL;

// Buscar todos os cursos
export async function getAnimais(): Promise<Animal[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/animais`, {
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar Animais");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar Animais", error);
    throw error;
  }
}

// Buscar um animal específico por id
export async function getAnimal(id: string): Promise<Animal> {
  try {
    const response = await fetch(`${API_BASE_URL}/animais/${id}`, {
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar animal: ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar animal ${id}:`, error);
    throw error;
  }
}
