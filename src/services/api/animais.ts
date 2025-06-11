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
      next: { revalidate: 3600 } // Cache por 1 hora
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar Animais');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar Animais', error);
    throw error;
  }
}

// Buscar um curso específico por slug (inclui as aulas)
export async function getCurso(slug: string): Promise<Animal> {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      next: { revalidate: 3600 } // Cache por 1 hora
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar curso: ${slug}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar curso ${slug}:`, error);
    throw error;
  }
}

