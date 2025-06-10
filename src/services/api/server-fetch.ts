// Tipagem para os produtos
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  importado: number;
}

// Função para buscar todos os produtos
export async function fetchProdutos(): Promise<Produto[]> {
  try {
    const response = await fetch("https://api.origamid.online/produtos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache da requisição por 60 segundos
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const produtos: Produto[] = await response.json();
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

// Função para buscar um produto específico por ID
export async function fetchProdutoPorId(id: number): Promise<Produto | null> {
  try {
    const produtos = await fetchProdutos();
    const produto = produtos.find((p) => p.id === id);
    return produto || null;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    throw error;
  }
}

// Função auxiliar para filtrar produtos importados
export async function fetchProdutosImportados(): Promise<Produto[]> {
  try {
    const produtos = await fetchProdutos();
    return produtos.filter((produto) => produto.importado === 1);
  } catch (error) {
    console.error("Erro ao buscar produtos importados:", error);
    throw error;
  }
}

// Função auxiliar para filtrar produtos em estoque
export async function fetchProdutosEmEstoque(): Promise<Produto[]> {
  try {
    const produtos = await fetchProdutos();
    return produtos.filter((produto) => produto.estoque > 0);
  } catch (error) {
    console.error("Erro ao buscar produtos em estoque:", error);
    throw error;
  }
}

// Função para buscar um produto específico por ID diretamente da API
export async function fetchProdutoPorIdDireto(
  id: number
): Promise<Produto | null> {
  try {
    const response = await fetch(`https://api.origamid.online/produtos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache da requisição por 60 segundos
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Produto não encontrado
      }
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const produto: Produto = await response.json();
    return produto;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    throw error;
  }
}
