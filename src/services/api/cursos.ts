// Tipos para a API de cursos
export interface Curso {
  id: number;
  slug: string;
  nome: string;
  descricao: string;
  total_aulas: number;
  total_horas: number;
  aulas?: Aula[];
}

export interface Aula {
  id: number;
  slug: string;
  nome: string;
  descricao: string;
  curso_id: number;
  tempo: number;
  ordem: number;
}

const API_BASE_URL = process.env.API_URL;


// Buscar todos os cursos
export async function getCursos(): Promise<Curso[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/cursos`, {
      next: { revalidate: 3600 } // Cache por 1 hora
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar cursos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    throw error;
  }
}

// Buscar um curso específico por slug (inclui as aulas)
export async function getCurso(slug: string): Promise<Curso> {
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

// Buscar uma aula específica por slug do curso e slug da aula
export async function getAula(cursoSlug: string, aulaSlug: string): Promise<Aula> {
  try {
    const response = await fetch(`${API_BASE_URL}/${cursoSlug}/${aulaSlug}`, {
      next: { revalidate: 3600 } // Cache por 1 hora
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar aula: ${cursoSlug}/${aulaSlug}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar aula ${cursoSlug}/${aulaSlug}:`, error);
    throw error;
  }
}

// Utilitário para formatar tempo em minutos para horas e minutos
export function formatarTempo(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  
  if (horas === 0) {
    return `${minutosRestantes}min`;
  }
  
  if (minutosRestantes === 0) {
    return `${horas}h`;
  }
  
  return `${horas}h ${minutosRestantes}min`;
}
